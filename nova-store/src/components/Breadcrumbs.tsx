import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav className="breadcrumbs" aria-label="Breadcrumb">
    {items.map((item, index) => {
      const isLastItem = index === items.length - 1;

      return (
        <span className="breadcrumbs__item" key={`${item.label}-${index}`}>
          {item.to && !isLastItem ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span aria-current={isLastItem ? 'page' : undefined}>{item.label}</span>
          )}
          {!isLastItem && <span aria-hidden="true">/</span>}
        </span>
      );
    })}
  </nav>
);

export default Breadcrumbs;
