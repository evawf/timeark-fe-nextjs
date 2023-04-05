export default interface Project {
  id: string;
  name: number;
  description: string;
  budget: number;
  ratePerHour: number;
  dueDate: string;
  categories: Array<string>;
  userId: string;
  clientId: string;
}
