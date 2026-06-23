import { Link } from 'react-router-dom';
export default function NotFound() { return <section className="not-found"><strong>404</strong><h1>Page not found</h1><p>The requested page does not exist.</p><Link className="button" to="/">Return home</Link></section>; }
