// src/types/chartTypes.ts
export interface PieDataItem {
  neighborhood: string;
  percentage: number;
}

export interface BarDataItem {
  product: string;
  units: number;
}

export interface LineDataItem {
  month: string;
  orders: number;
}
