import { UserOutput } from './User';

interface MessageResponse {
  message: string;
  id?: number;
}

interface UserMessageResponse {
  message: string;
  user: UserOutput;
}

export { MessageResponse, UserMessageResponse };
