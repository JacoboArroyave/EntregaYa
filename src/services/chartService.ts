import axios from 'axios';
import { PieDataItem, BarDataItem, LineDataItem } from '../types/chartType';

const BASE_URL = "https://6c82ac11-d480-4120-af11-11c87e53ddda.mock.pstmn.io";

export const fetchPieData = async (): Promise<PieDataItem[]> => {
  const res = await axios.get(`${BASE_URL}/orders/by-neighborhood`);
  console.log(res.data.data)
  return res.data.data;
};

export const fetchBarData = async (): Promise<BarDataItem[]> => {
  const res = await axios.get(`${BASE_URL}/sales/by-product`);
  console.log(res.data)
  return res.data.data;
};

export const fetchLineData = async (): Promise<LineDataItem[]> => {
  const res = await axios.get(`${BASE_URL}/orders/monthly`);
  console.log(res.data)
  return res.data.data;
};
