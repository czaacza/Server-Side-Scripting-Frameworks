import orderModel from '../models/orderModel';
import {UserIdWithToken} from '../../interfaces/User';
import {GraphQLError} from 'graphql';
import {Order, OrderModify} from '../../interfaces/Order';

export default {
  Query: {
    ordersByAdmin: async () => {
      const users = await orderModel.find();

      return users;
    },
    ordersByUser: async (_parent: unknown, _args: {userId: string}) => {
      const orders = await orderModel.find({userId: _args.userId});
      return orders;
    },
  },
  Mutation: {
    createOrder: async (
      _parent: unknown,
      args: {
        orderInput: Order;
      }
    ) => {
      const order = new orderModel(args.orderInput);
      const newOrder = await order.save();
      return newOrder;
    },
    updateOrder: async (
      _parent: unknown,
      args: {
        orderModifyInput: OrderModify;
      }
    ) => {
      const order = await orderModel.findById(args.orderModifyInput.id);
      if (!order) {
        throw new GraphQLError('Order not found');
      }
      const updatedOrder = await orderModel.findByIdAndUpdate(
        args.orderModifyInput.id,
        args.orderModifyInput,
        {new: true}
      );

      return updatedOrder;
    },
    deleteOrder: async (_parent: unknown, args: {id: string}) => {
      const order = await orderModel.findById(args.id);
      if (!order) {
        throw new GraphQLError('Order not found');
      }
      const deletedOrder = await orderModel.findByIdAndDelete(args.id);
      return deletedOrder;
    },
  },
};
