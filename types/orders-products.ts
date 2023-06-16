
export interface Product {
    id: number;
    serialNumber: number;
    isNew: number;
    photo: string;
    title: string;
    type: string;
    specification: string;
    guarantee: {
      start: string;
      end: string;
    };
    price: {
      value: number;
      symbol: string;
      isDefault: number;
    }[];
    order: number;
    date: string;
  }
  
  export interface Order {
    id: number;
    title: string;
    date: string | number;
    description: string;
    products: Product[];
  }
export interface DataOrders{
    isActive: boolean,
    orders: Order[],
    expandedOrder: number | null,
    selectedOrder: Order | null,
    showDeletePopup: boolean,
    selectedProduct: Product | null,
}
export interface DataProducts{
    products: Product[],
    showDeletePopup: boolean,
    selectedProduct: Product | null,
    sortOption:  string,
}