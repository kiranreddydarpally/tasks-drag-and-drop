import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./components/drag-item";
import DropZone from "./components/drop-zone";
import { initialDroppedItems } from "./utils/dropped-items";
import { IdropedItems } from "./utils/dropped-items.interface";

const App = () => {
  const [droppedItems, setDroppedItems] =
    useState<IdropedItems[]>(initialDroppedItems);

  const handleDrop = (item: any) => {
    if (item.type !== item?.items?.type) {
      setDroppedItems((prevItems: any): any => [
        ...prevItems,
        {
          type: item?.type,
          name: item?.items?.name,
          subTasks: item?.items?.subTasks,
          dueDate: item?.items?.dueDate,
        },
      ]);
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...droppedItems];
    updatedItems.splice(index, 1);
    setDroppedItems(updatedItems);
  };

  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <h1>Personal </h1>
        <p>A board to keep track of personal tasks.</p>
        <div className="main-content">
          <div className="column">
            <div className="column-name not-started-color">Not started</div>
            <DropZone
              onDrop={handleDrop}
              droppedItems={droppedItems.filter(
                (item) => item.type === "Not started"
              )}
              handleRemoveItem={handleRemoveItem}
              type="Not started"
            />
          </div>
          <div className="column">
            <div className="column-name in-progress-color">In progress</div>
            <DropZone
              onDrop={handleDrop}
              droppedItems={droppedItems.filter(
                (item) => item.type === "In progress"
              )}
              handleRemoveItem={handleRemoveItem}
              type="In progress"
            />
          </div>
          <div className="column">
            <div className="column-name blocked-color">Blocked</div>
            <DropZone
              onDrop={handleDrop}
              droppedItems={droppedItems.filter(
                (item) => item.type === "Blocked"
              )}
              handleRemoveItem={handleRemoveItem}
              type="Blocked"
            />
          </div>
          <div className="column">
            <div className="column-name done-color">Done</div>
            <DropZone
              onDrop={handleDrop}
              droppedItems={droppedItems.filter((item) => item.type === "Done")}
              handleRemoveItem={handleRemoveItem}
              type="Done"
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
