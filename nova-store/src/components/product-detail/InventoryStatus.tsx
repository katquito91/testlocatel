import type { InventoryStatus as InventoryStatusType } from '../../services/productTypes';

const inventoryLabels: Record<InventoryStatusType, string> = {
  'in-stock': 'Disponible',
  'low-stock': 'Pocas unidades',
  'out-of-stock': 'Sin stock',
};

interface InventoryStatusProps {
  status: InventoryStatusType;
  stock: number;
}

const InventoryStatus = ({ status, stock }: InventoryStatusProps) => (
  <p className={`inventory-status inventory-status--${status}`}>
    {inventoryLabels[status]} · {stock} unidades
  </p>
);

export default InventoryStatus;
