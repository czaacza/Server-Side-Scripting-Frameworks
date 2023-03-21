import {IAnimal} from './Animal';
import {ICategory} from './Category';
import {ISpecies} from './Species';

export default interface MessageResponse {
  message: string;
  data: ICategory | ICategory[] | ISpecies | ISpecies[] | IAnimal | IAnimal[];
}
