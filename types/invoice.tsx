export default interface Invoice {
  id: string;
  issueDate: Date;
  projectId: string;
  isPaid: boolean;
  chargeable_tasks: [
    {
      id: string;
      projectName: string;
      timeSpent: string;
      invoiceId: string;
    }
  ];
  project: {
    id: string;
    name: string;
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
