import {Document, Types} from 'mongoose';
import {TestCategory} from './Category';
import {Point} from 'geojson';

interface Species extends Document {
  species_name: string;
  category: Types.ObjectId;
  image: string;
  location: Point;
}

interface TestSpecies {
  id?: string;
  species_name: string;
  category: TestCategory;
  image: string;
  location: Point;
}

export {Species, TestSpecies};
