import {Animal} from './Animal';
import {Species} from './Species';
import Category from './Category';

export default interface MessageResponse {
  message: string;
  result: Animal | Species | Category;
}
