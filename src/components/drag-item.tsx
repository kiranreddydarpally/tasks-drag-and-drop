import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { IdropedItems } from "../utils/dropped-items.interface";
import "./drag-item.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditModal from "./edit-modal";

const DragItem = ({
  item,
  type,
  handleRemoveItem,
  id,
  handleAddItem,
}: {
  item: IdropedItems;
  type: string;
  handleRemoveItem: (id: number) => void;
  id: number;
  handleAddItem: (editName: string, editDueDate: string, id: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "fe-kanban-board",
    item: { ...item, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(dragRef);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div ref={dragRef} className="task-item">
      <div className="task-header">
        <div className="task-title">{item.name}</div>
        <div>
          <EditIcon
            className="cursor"
            onClick={() => {
              setOpen(true);
            }}
          ></EditIcon>
          <DeleteOutlineIcon
            className="cursor"
            onClick={() => handleRemoveItem(id)}
          ></DeleteOutlineIcon>
        </div>
      </div>
      {item.dueDate && (
        <div className="due-date">
          Due{" "}
          {`${new Date(item.dueDate).getDate()}/${
            new Date(item.dueDate).getMonth() + 1
          }`}
        </div>
      )}
      {item.subTasks && (
        <ul className="subtasks">
          {item.subTasks.map((subTaskItem: string, index: number) => {
            return <li key={index}>{subTaskItem}</li>;
          })}
        </ul>
      )}
      <EditModal
        open={open}
        handleClose={handleClose}
        taskName={item.name}
        setOpen={setOpen}
        taskDueDate={item.dueDate ?? ""}
        handleAddItem={handleAddItem}
        id={id}
      />
    </div>
  );
};

export default DragItem;
