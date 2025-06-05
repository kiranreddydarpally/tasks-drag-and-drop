export const initialDroppedItems=[
    { type: "Not started", name: "take Coco to a vet", dueDate: "4/11/2021" },
    { type: "Not started", name: "take Coco to a vet", dueDate: "12/4/2021" },
    {
      type: "In progress",
      name: "Taxes",
      subTasks: [
        "Accountant Contract",
        "Request work playslips",
        "Cacel VAT ID",
      ],
    },
    { type: "Blocked", name: "123blocked" },
    { type: "Done", name: "123Done" },
  ]