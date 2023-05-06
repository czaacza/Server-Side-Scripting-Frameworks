import navbar from '../components/navbar';
import hero from './hero';
import products from './products';
import testimonials from './testimonials';

export default function index(user?: any, books?: any, cart?: any): string {
  const modalHtml = `

    ${navbar(user, cart)}

    ${hero()}

    

    ${products(books)}

    ${testimonials()}  
`;
  return modalHtml;
}
