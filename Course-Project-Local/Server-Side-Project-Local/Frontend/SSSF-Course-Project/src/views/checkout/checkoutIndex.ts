import { User } from '../../interfaces/User';
import navbar from '../components/navbar';
import checkoutSection from './checkoutSection';

export default function index(user?: User, cart?: any): string {
  const modalHtml = `

    ${navbar(user, cart)}

    ${checkoutSection(user, cart)}
`;
  return modalHtml;
}
