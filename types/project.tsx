export default interface Project {
  id: string;
  name: number;
  description: string;
  budget: number;
  ratePerHour: number;
  dueDate: string;
  categories: [];
  userId: string;
  clientId: string;
}
