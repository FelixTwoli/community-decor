export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional for DTOs where password might not be present
  role: string;
  location: string;
  interests: string[];
}
