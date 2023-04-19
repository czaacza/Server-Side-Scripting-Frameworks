import { Order } from '../../interfaces/Order';
import { Schema, model } from 'mongoose';

const orderSchema = new Schema<Order>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default model<Order>('Order', orderSchema);
