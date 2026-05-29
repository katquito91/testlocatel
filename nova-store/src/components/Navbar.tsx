import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useCatalog } from '../hooks/useCatalog';

const Navbar = () => {
  const { categories } = useCatalog();
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <Link className="navbar__logo" to="/">
        Nova Store
      </Link>
      <nav aria-label="Navegacion principal">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Catalogo</NavLink>
        <NavLink to="/cart">Carrito ({totalItems})</NavLink>
      </nav>
      <div className="navbar__categories" aria-label="Categorias destacadas">
        {categories.map((category) => (
          <span key={category}>{category}</span>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
