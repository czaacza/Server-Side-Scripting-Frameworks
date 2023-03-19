import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthor extends Document {
  name: string;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);
