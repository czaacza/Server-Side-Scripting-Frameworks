import mongoose, {Schema} from 'mongoose';
import {IAnimal} from '../../interfaces/Animal';

const AnimalSchema: Schema = new mongoose.Schema<IAnimal>({
  animal_name: {type: String, required: true, minlength: 2},
  species: {type: Schema.Types.ObjectId, ref: 'Species', required: true},
  birthdate: {type: Date, required: true},
});

export default mongoose.model<IAnimal>('Animal', AnimalSchema);
