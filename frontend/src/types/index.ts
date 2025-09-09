export interface Campaign {
  id: number;
  name: string;
  description: string;
  status: 'draft' | 'scheduled' | 'running' | 'completed' | 'paused';
  target_segment: string;
  schedule_time?: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  segment: string;
  created_at: string;
}