export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  status: "available" | "sold" | "pending";
  image_url: string;
  created_at: string;
}