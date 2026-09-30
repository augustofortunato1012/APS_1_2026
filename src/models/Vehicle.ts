export interface Vehicle {
  id: string;
  client_id: string;
  brand: string;
  model: string;
  year: number | null;
  license_plate: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}
