import {Order} from '../../interfaces/Order';
import {Schema, model} from 'mongoose';

const orderSchema = new Schema<Order>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  books: [
    {
      book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  details: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
  },
  status: {
    type: String,
    required: true,
  },
});

export default model<Order>('Order', orderSchema);
