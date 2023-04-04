import {Document} from 'mongoose';

interface Category extends Document {
  category_name: string;
}

interface TestCategory {
  id?: string;
  category_name: string;
}

export {Category, TestCategory};
