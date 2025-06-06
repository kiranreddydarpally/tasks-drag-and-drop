export interface IdropedItems {
  id: number;
  type: string;
  name: string;
  dueDate?: string; //mm/dd/yyyy
  subTasks?: string[];
}
