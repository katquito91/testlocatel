import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useCatalog } from '../hooks/useCatalog';

const Navbar = () => {
  const { categories } = useCatalog();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <Link className="navbar__logo" to="/">
        Nova Store
      </Link>
      <button
        className="navbar__toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
      >
        Menu
      </button>
      <nav
        id="primary-navigation"
        className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}
        aria-label="Navegacion principal"
      >
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={closeMenu}>
          Catalogo
        </NavLink>
        <NavLink to="/cart" onClick={closeMenu}>
          Carrito ({totalItems})
        </NavLink>
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
