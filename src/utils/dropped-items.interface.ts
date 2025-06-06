export interface IdropedItems {
  taskId: number;
  type: string;
  name: string;
  dueDate?: string; //mm/dd/yyyy
  subTasks?: string[];
}
