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

  const handleRemoveItem = (id: number) => {
    let updatedItems = [...droppedItems];
    updatedItems = updatedItems.filter((item) => item.id !== id);
    setDroppedItems(updatedItems);
  };

  const handleAddItem = (editName: string, editDueDate: string, id: number) => {
    let updatedItems = [...droppedItems];
    let filteredItems = updatedItems.filter((item) => item.id !== id);
    let filteredItem = updatedItems.filter((item) => item.id === id);

    const editItem: IdropedItems = {
      id: filteredItem[0]?.id,
      name: editName,
      dueDate: editDueDate,
      type: filteredItem[0]?.type,
      subTasks: filteredItem[0]?.subTasks,
    };

    setDroppedItems([...filteredItems, editItem]);
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
              handleAddItem={handleAddItem}
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
              handleAddItem={handleAddItem}
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
              handleAddItem={handleAddItem}
            />
          </div>
          <div className="column">
            <div className="column-name done-color">Done</div>
            <DropZone
              onDrop={handleDrop}
              droppedItems={droppedItems.filter((item) => item.type === "Done")}
              handleRemoveItem={handleRemoveItem}
              type="Done"
              handleAddItem={handleAddItem}
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
