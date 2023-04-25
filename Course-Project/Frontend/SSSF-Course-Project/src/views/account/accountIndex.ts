import { Cart } from '../../interfaces/Cart';
import { User } from '../../interfaces/User';
import navbar from '../components/navbar';
import accountSection from './accountSection';
import ordersSection from './ordersSection';

export default function index(
  user?: User,
  orders?: any,
  products?: any,
  cart?: any
): string {
  const modalHtml = `

    ${navbar(user, cart)}

    ${accountSection(user)}

    ${ordersSection(orders, products)}
`;
  return modalHtml;
}
