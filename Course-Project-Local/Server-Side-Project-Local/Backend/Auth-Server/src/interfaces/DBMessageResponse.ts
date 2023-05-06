import { UserOutput } from './User';

export default interface DBMessageResponse {
  message: string;
  user: UserOutput;
}
