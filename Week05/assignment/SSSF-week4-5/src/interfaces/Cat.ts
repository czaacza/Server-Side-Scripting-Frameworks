import {User} from './User';
import {Types, Document} from 'mongoose';
import {Point} from 'geojson';

interface Cat extends Document {
  cat_name: string;
  weight: number;
  owner: Types.ObjectId | User;
  filename: string;
  birthdate: Date;
  location: Point;
}

interface CatTest {
  id?: string;
  cat_name?: string; // returned from graphql is snake_case
  catName?: string; // graphql variables are camelCase
  weight?: number;
  owner?: Types.ObjectId | User;
  filename?: string;
  birthdate?: Date;
  location?: Point;
}

export {Cat, CatTest};
