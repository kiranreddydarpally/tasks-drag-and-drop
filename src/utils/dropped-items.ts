import { ColumnTypesEnum } from "./column-types.enum";

export const initialDroppedItems = [
  {
    taskId: 1,
    type: ColumnTypesEnum.NOTSTARTED,
    name: "take Coco to a vet",
    dueDate: "12/4/2021",
  },
  {
    taskId: 2,
    type: ColumnTypesEnum.INPROGRESS,
    name: "Taxes",
    subTasks: ["Accountant Contract", "Request work playslips", "Cacel VAT ID"],
  },
  {
    taskId: 3,
    type: ColumnTypesEnum.INPROGRESS,
    name: "take Coco to a vet",
    dueDate: "4/11/2021",
  },

  { taskId: 4, type: ColumnTypesEnum.BLOCKED, name: "123blocked" },
  { taskId: 5, type: ColumnTypesEnum.DONE, name: "123Done" },
];
