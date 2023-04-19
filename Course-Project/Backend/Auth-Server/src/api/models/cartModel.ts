import { Schema, model } from 'mongoose';
import { Cart } from '../../interfaces/Cart';

const CartSchema = new Schema<Cart>({
  userId: { type: Schema.Types.ObjectId, required: true },
  books: [
    {
      book: { type: Schema.Types.ObjectId, ref: 'Book' },
      quantity: { type: Number, required: true },
    },
  ],
});

export default model<Cart>('Cart', CartSchema);
