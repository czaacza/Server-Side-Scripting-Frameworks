import {Document} from 'mongoose';
import {Species} from './Species';

interface Animal extends Document {
  animal_name: string;
  species: Species;
  birthdate: Date;
}

interface TestAnimal {
  id?: string;
  animal_name: string;
  species: string;
  birthdate: Date;
}

export {Animal, TestAnimal};
