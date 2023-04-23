import { Cart } from '../../interfaces/Cart';
import { User } from '../../interfaces/User';
import navbar from '../components/navbar';
import accountSection from './accountSection';

export default function index(user?: User, cart?: Cart): string {
  const modalHtml = `

    ${navbar(user, cart)}

    ${accountSection(user)}
`;
  return modalHtml;
}
