export default interface TimeEntry {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  taskId: string;
  task: {
    name: string;
    project: {
      name: string;
      client: {
        name: string;
      };
    };
  };
}
