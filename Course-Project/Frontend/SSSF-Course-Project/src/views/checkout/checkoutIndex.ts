import navbar from '../components/navbar';
import checkoutSection from './checkoutSection';

export default function index(user?: any, cart?: any): string {
  const modalHtml = `

    ${navbar(user, cart)}

    ${checkoutSection(user, cart)}
`;
  return modalHtml;
}
