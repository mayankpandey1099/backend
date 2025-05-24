export interface ShowData {
  show_id: string;
  type: string;
  title: string;
  director?: string;
  cast: string[];
  country?: string;
  date_added?: Date;
  release_year?: number;
  rating?: string;
  duration?: string;
  listed_in: string[];
  description?: string;
}

export interface ApiResponse {
  status: number;
  message: string;
  data: any;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
  age: number;
}