import mongoose from 'mongoose';
import {Animal} from '../../interfaces/Animal';
// based on iterface Animal located in src/interfaces/Animal.ts

const animalSchema = new mongoose.Schema<Animal>({
  animal_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  species: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Species',
    required: true,
  },
  birthdate: {
    type: Date,
    // required: true,
  },
});

export default mongoose.model<Animal>('Animal', animalSchema);
