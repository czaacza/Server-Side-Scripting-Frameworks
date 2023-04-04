import mongoose from 'mongoose';
import {Category} from '../../interfaces/Category';
// Schema for category model
// based on iterface Category located in src/interfaces/Category.ts

const categorySchema = new mongoose.Schema<Category>({
  category_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
});

// Create model for category
export default mongoose.model<Category>('Category', categorySchema);
