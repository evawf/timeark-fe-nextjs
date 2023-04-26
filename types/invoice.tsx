export default interface Invoice {
  id: string;
  issueDate: Date;
  projectId: string;
  isPaid: boolean;
  chargeable_tasks: [
    {
      id: string;
      taskName: string;
      projectName: string;
      timeSpent: string;
      invoiceId: string;
    }
  ];
  project: {
    id: string;
    name: string;
    description: string;
    budget: string;
    ratePerHour: string;
    dueDate: Date;
    client: {
      name: string;
      address: string;
      city: string;
      country: string;
      postalCode: string;
      contact: string;
      email: string;
    };
    user: {
      companyName: string;
      address: string;
      city: string;
      country: string;
      postalCode: string;
      contact: string;
    };
  };
}
