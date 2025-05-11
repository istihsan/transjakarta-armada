export interface Vehicle {
  id: string;
  attributes: {
    label: string;
    bearing: number;
    current_status: string;
    current_stop_sequence: number;
    direction_id: number;
    latitude: number;
    longitude: number;
    speed: number;
    updated_at: string;
    revenue: string;
  };
  relationships: {
    route: { data: { id: string } };
    trip: { data: { id: string } };
  };
}
