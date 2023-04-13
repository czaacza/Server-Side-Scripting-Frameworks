import {GraphQLError} from 'graphql';
import {Cat} from '../../interfaces/Cat';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';
import {User, UserIdWithToken} from '../../interfaces/User';
// TODO: create resolvers based on user.graphql
// note: when updating or deleting a user don't send id to the auth server, it will get it from the token
// note2: when updating or deleting a user as admin, you need to check if the user is an admin by checking the role from the user object
