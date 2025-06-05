import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import DragItem from "./drag-item";
import "./drop-zone.css";

const DropZone = ({
  onDrop,
  droppedItems,
  handleRemoveItem,
  type,
}: {
  onDrop: any;
  droppedItems: any[];
  handleRemoveItem: (index: number) => void;
  type: string;
}) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "fe-kanban-board",
    drop: (item: any) => {
      console.log("item", item);
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
          <DragItem item={item} type={type} />
        </div>
      ))}
    </div>
  );
};

export default DropZone;
