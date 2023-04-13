import { User } from './User';

export default interface LoginMessageResponse {
  login: {
    token?: string;
    message: string;
    user: User;
  };
}
