// TODO: mongoose schema for cat
import mongoose, {Schema} from 'mongoose';
import {Cat} from '../../interfaces/Cat';

const catSchema = new Schema<Cat>({
  cat_name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  coords: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model<Cat>('Cat', catSchema);
