import mongoose, {Document, Types} from 'mongoose';

// TODO: interface for Animal
interface IAnimal extends Document {
  animal_name: string;
  species: Types.ObjectId;
  birthdate: Date;
}

export {IAnimal};
