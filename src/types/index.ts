export type ProductType = {
  id: number;
  brand: string;
  name: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  quantity: number;
  img: string;
};

export type SearchParamsProps = {
  handleChangeFilters: (a: string, b: string) => void;
  searchParams: URLSearchParams;
};
