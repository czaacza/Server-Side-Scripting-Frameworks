// Schema for category model
import mongoose, {Schema} from 'mongoose';
import {ICategory} from '../../interfaces/Category';

const CategorySchema: Schema = new Schema<ICategory>({
  category_name: {type: String, required: true, unique: true, minlength: 2},
});

export default mongoose.model<ICategory>('Category', CategorySchema);
