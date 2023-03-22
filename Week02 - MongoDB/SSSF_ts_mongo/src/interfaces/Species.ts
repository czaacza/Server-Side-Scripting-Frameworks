import {Point} from 'geojson';
import mongoose, {Document, Types} from 'mongoose';
import {ICategory} from './Category';

interface ISpecies extends Document {
  species_name: string;
  category: Types.ObjectId;
  image: string;
  location: Point;
}

interface ISpeciesTest extends Document {
  species_name: string;
  category: ICategory;
  image: string;
  location: Point;
}

interface ISpeciesObject {
  species_name: string;
  category: string;
  image: string;
  location: Point;
}

interface ShowSpecies {
  species_name: string;
  category: Types.ObjectId;
}

export {ISpecies, ISpeciesTest, ISpeciesObject, ShowSpecies};
