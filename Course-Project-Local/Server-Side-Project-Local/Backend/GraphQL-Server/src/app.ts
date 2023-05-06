/* eslint-disable node/no-extraneous-import */
require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import typeDefs from './api/schemas/index';
import resolvers from './api/resolvers/index';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import {notFound, errorHandler} from './middlewares';
import authenticate from './functions/authenticate';
import {MyContext} from './interfaces/MyContext';
import {createRateLimitRule} from 'graphql-rate-limit';
import {shield} from 'graphql-shield';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {applyMiddleware} from 'graphql-middleware';
import {sendOrderEmail} from './functions/emailSender';

const app = express();

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  })
);
app.use(cors<cors.CorsRequest>());
app.use(express.json());

(async () => {
  try {
    const rateLimitRule = createRateLimitRule({
      identifyContext: (ctx) => ctx.id,
    });

    const permissions = shield(
      {
        Query: {
          users: rateLimitRule({window: '1s', max: 5}),
        },
      },
      {
        debug: true,
      }
    );

    const schema = applyMiddleware(
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
      permissions
    );

    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
      })
    );

    const server = new ApolloServer<MyContext>({
      schema,
      introspection: true,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              embed: true as false,
            })
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
      includeStacktraceInErrorResponses: false,
    });
    await server.start();

    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({req}) => authenticate(req),
      })
    );

    app.post('/send-email', async (req, res) => {
      const {userEmail, orderDetails} = req.body;
      try {
        await sendOrderEmail({userEmail, orderDetails});
        res.status(200).send('Email sent successfully.');
      } catch (error) {
        res.status(500).send('Error sending email.');
      }
    });

    app.use(notFound);
    app.use(errorHandler);
  } catch (error) {
    console.log(error);
  }
})();

export default app;
