import { Point } from 'geojson';

interface Animal {
  id: string;
  animal_name: string;
  species: string;
  birthdate: Date;
  image: string;
  location: Point;
}

export type { Animal };
