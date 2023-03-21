import mongoose, {Schema, Types} from 'mongoose';
import {ISpecies} from '../../interfaces/Species';

const SpeciesSchema: Schema = new Schema<ISpecies>({
  species_name: {type: String, required: true, unique: true, minlength: 2},
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  image: {type: String, required: true},
  location: {
    type: {enum: ['Point'], required: true},
    coordinates: {type: [Number], default: [0, 0], required: true},
  },
});

export default mongoose.model<ISpecies>('Species', SpeciesSchema);
