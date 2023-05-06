import navbar from '../components/navbar';
import cartSection from './cartSection';

export default function index(user?: any, cart?: any): string {
  const modalHtml = `

    ${navbar(user, cart)}

    ${cartSection(cart)}
`;
  return modalHtml;
}
