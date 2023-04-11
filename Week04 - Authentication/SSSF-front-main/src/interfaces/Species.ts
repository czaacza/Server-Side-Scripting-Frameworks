import { Point } from 'geojson';
import { Category } from './Category';

interface Species {
  id: string;
  species_name: string;
  category: Category | string;
  image: string;
  location: Point;
}

export type { Species };
