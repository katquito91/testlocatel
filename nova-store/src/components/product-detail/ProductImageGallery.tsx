import type { Product } from '../../services/productTypes';

interface ProductImageGalleryProps {
  product: Product;
}

const ProductImageGallery = ({ product }: ProductImageGalleryProps) => (
  <div className="product-gallery">
    <img src={product.imageUrl} alt={product.name} />
    <div className="product-gallery__thumbs" aria-label="Imagenes del producto">
      <img src={product.imageUrl} alt={`${product.name} miniatura 1`} />
      <img src={product.imageUrl} alt={`${product.name} miniatura 2`} />
      <img src={product.imageUrl} alt={`${product.name} miniatura 3`} />
    </div>
  </div>
);

export default ProductImageGallery;
