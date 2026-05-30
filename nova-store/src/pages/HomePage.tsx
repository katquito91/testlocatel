import { Link } from 'react-router-dom';

const HomePage = () => (
  <section className="hero">
    <p className="eyebrow">Tienda virtual</p>
    <h1>Nova Store</h1>
    <p>
      Explora productos seleccionados, filtra el catalogo y agrega tus favoritos
      al carrito.
    </p>
    <Link className="button button--primary" to="/products">
      Ver catalogo
    </Link>
  </section>
);

export default HomePage;
