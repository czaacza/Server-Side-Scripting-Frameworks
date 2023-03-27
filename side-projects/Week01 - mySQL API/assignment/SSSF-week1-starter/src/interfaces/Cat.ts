import {RowDataPacket} from 'mysql2';
import {OwnerUser, PutUser, User} from './User';

interface Cat {
  cat_id: number;
  cat_name: string;
  weight: number;
  filename: string;
  birthdate: string;
  lat: number;
  lng: number;
  owner: OwnerUser | number;
  // owner should be a User or a number
}

interface GetCat extends RowDataPacket, Cat {}

// TODO: create PostCat interface. Same as cat but without id
type PostCat = Omit<Cat, 'cat_id'>;

// TODO: create PutCat interface. Sameas PostCat but properties are optional
type PutCat = Partial<PostCat>;

export {Cat, GetCat, PostCat, PutCat};
