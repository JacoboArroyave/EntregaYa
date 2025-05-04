import type { Driver } from './Driver';
import type { Motorcycle } from './Motorcycle';

export interface Shift {
  id: number;
  start_time: string;
  end_time: string;
  status: string;
  driver_id: Driver['id'];         
  motorcycle_id: Motorcycle['id']; 
}
