import {Point} from 'geojson';
import mongoose, {Document, Types} from 'mongoose';

interface ISpecies extends Document {
  species_name: string;
  category: Types.ObjectId;
  image: string;
  location: Point;
}

export {ISpecies};
