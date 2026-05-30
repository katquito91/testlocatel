import Badge from '../Badge';

interface ProductBadgeProps {
  label?: string;
}

const ProductBadge = ({ label }: ProductBadgeProps) => {
  if (!label) return null;

  return <Badge label={label} />;
};

export default ProductBadge;
