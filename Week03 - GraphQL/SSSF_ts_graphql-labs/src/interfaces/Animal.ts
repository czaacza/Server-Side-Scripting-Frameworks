import {Point} from 'geojson';
import {Document} from 'mongoose';
import {Species} from './Species';

interface Animal extends Document {
  animal_name: string;
  species: Species;
  birthdate: Date;
  image: string;
  location: Point;
}

interface TestAnimal {
  id?: string;
  animal_name: string;
  species: string;
  birthdate: Date;
  image: string;
  location: Point;
}

export {Animal, TestAnimal};
