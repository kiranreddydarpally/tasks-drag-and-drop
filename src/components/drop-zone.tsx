import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import DragItem from "./drag-item";
import "./drop-zone.css";
import { IdropedItems } from "../utils/dropped-items.interface";
import { ColumnTypesEnum } from "../utils/column-types.enum";

const DropZone = ({
  onDrop,
  droppedItems,
  handleRemoveItem,
  type,
  handleEditItem,
}: {
  onDrop: any;
  droppedItems: IdropedItems[];
  handleRemoveItem: (taskId: number) => void;
  type: string;
  handleEditItem: (
    editName: string,
    editDueDate: string,
    taskId: number,
    subTasks: string[],
    columnType: ColumnTypesEnum
  ) => void;
}) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "fe-kanban-board",
    drop: (item: any) => {
      onDrop({ items: item, type: type });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drop(dropRef);

  return (
    <div ref={dropRef} className="drop-zone">
      {droppedItems.map((item, index) => (
        <div className="draged-item" key={index}>
          <DragItem
            item={item}
            type={type}
            handleRemoveItem={handleRemoveItem}
            taskId={item.taskId}
            handleEditItem={handleEditItem}
          />
        </div>
      ))}
    </div>
  );
};

export default DropZone;
