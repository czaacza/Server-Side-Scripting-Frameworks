import { UserOutput } from './User';

export default interface LoginMessageResponse {
  token: string;
  message: string;
  user: UserOutput;
}
