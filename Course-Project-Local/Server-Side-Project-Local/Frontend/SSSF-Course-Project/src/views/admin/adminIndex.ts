import {
  generateUsersList,
  initSearchUsers,
} from '../../functions/adminUserPanel';
import { Book } from '../../interfaces/Book';
import { Cart } from '../../interfaces/Cart';
import { User } from '../../interfaces/User';
import navbar from '../components/navbar';
import adminProductPanel from './adminProductPanel';
import adminUserPanel from './adminUserPanel';

export default function index(
  adminUser?: User,
  cart?: Cart,
  products?: Book[],
  users?: User[]
): string {
  const modalHtml = `
   ${navbar(adminUser, cart)}

   ${adminUserPanel(users)}

   ${adminProductPanel(products)}
  `;

  return modalHtml;
}
