import {RowDataPacket} from 'mysql2';
interface User {
  user_id: number;
  user_name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
}

// TODO: create interface GetUser that extends RowDataPacket and User
interface GetUser extends RowDataPacket, User {}

// TODO create interface PostUser that extends User but without id
type PostUser = Omit<User, 'user_id'>;

// TODO create interface PutUser that extends PostUser but all properties are optional
type PutUser = Partial<PostUser>;

type OwnerUser = {
  user_id: number;
  user_name: string;
};

export {User, GetUser, PostUser, PutUser, OwnerUser};
