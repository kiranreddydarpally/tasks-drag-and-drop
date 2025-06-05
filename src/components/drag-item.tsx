import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { IdropedItems } from "../utils/dropped-items.interface";
import "./drag-item.css";

const DragItem = ({ item, type }: { item: IdropedItems; type: string }) => {
  const dragRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "fe-kanban-board",
    item: { ...item, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  drag(dragRef);

  return (
    <div ref={dragRef} className="task-item">
      <div className="task-title">{item.name}</div>
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
    </div>
  );
};

export default DragItem;
