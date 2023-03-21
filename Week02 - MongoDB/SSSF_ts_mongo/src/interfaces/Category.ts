import mongoose, {Document} from 'mongoose';

interface ICategory extends Document {
  category_name: string;
}

export {ICategory};
