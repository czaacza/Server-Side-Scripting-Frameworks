import {IAnimal} from './Animal';
import {ICategory} from './Category';
import {ISpecies, ShowSpecies} from './Species';

export default interface MessageResponse {
  message: string;
  data:
    | ICategory
    | ICategory[]
    | ISpecies
    | ShowSpecies
    | ISpecies[]
    | IAnimal
    | IAnimal[];
}
