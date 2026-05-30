import type { Product } from '../../services/productTypes';

interface ProductImageGalleryProps {
  product: Product;
}

const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const thumbnails = [product.images.main, ...product.images.others];

  return (
    <div className="product-gallery">
      <img
        src={product.images.main}
        alt={product.name}
        loading="eager"
        decoding="async"
      />
      {thumbnails.length > 0 && (
        <div
          className="product-gallery__thumbs"
          aria-label="Imagenes del producto"
        >
          {thumbnails.map((imageUrl, index) => (
            <img
              key={imageUrl}
              src={imageUrl}
              alt={`${product.name} miniatura ${index + 1}`}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
