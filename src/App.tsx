import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropZone from "./components/drop-zone";
import { initialDroppedItems } from "./utils/dropped-items";
import { IdropedItems } from "./utils/dropped-items.interface";
import { ColumnTypesEnum } from "./utils/column-types.enum";

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

  const handleRemoveItem = (taskId: number) => {
    let updatedItems = [...droppedItems];
    updatedItems = updatedItems.filter((item) => item.taskId !== taskId);
    setDroppedItems(updatedItems);
  };

  const handleAddItem = (
    editName: string,
    editDueDate: string,
    taskId: number
  ) => {
    let updatedItems = [...droppedItems];
    let filteredItems = updatedItems.filter((item) => item.taskId !== taskId);
    let filteredItem = updatedItems.filter((item) => item.taskId === taskId);

    const editItem: IdropedItems = {
      taskId: filteredItem[0]?.taskId,
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
            <div className="column-name not-started-color">
              {ColumnTypesEnum.NOTSTARTED}
            </div>
            <DropZone
              onDrop={handleDrop}
              droppedItems={droppedItems.filter(
                (item) => item.type === ColumnTypesEnum.NOTSTARTED
              )}
              handleRemoveItem={handleRemoveItem}
              type={ColumnTypesEnum.NOTSTARTED}
              handleAddItem={handleAddItem}
            />
          </div>
          <div className="column">
            <div className="column-name in-progress-color">
              {ColumnTypesEnum.INPROGRESS}
            </div>
            <DropZone
              onDrop={handleDrop}
              droppedItems={droppedItems.filter(
                (item) => item.type === ColumnTypesEnum.INPROGRESS
              )}
              handleRemoveItem={handleRemoveItem}
              type={ColumnTypesEnum.INPROGRESS}
              handleAddItem={handleAddItem}
            />
          </div>
          <div className="column">
            <div className="column-name blocked-color">
              {ColumnTypesEnum.BLOCKED}
            </div>
            <DropZone
              onDrop={handleDrop}
              droppedItems={droppedItems.filter(
                (item) => item.type === ColumnTypesEnum.BLOCKED
              )}
              handleRemoveItem={handleRemoveItem}
              type={ColumnTypesEnum.BLOCKED}
              handleAddItem={handleAddItem}
            />
          </div>
          <div className="column">
            <div className="column-name done-color">{ColumnTypesEnum.DONE}</div>
            <DropZone
              onDrop={handleDrop}
              droppedItems={droppedItems.filter(
                (item) => item.type === ColumnTypesEnum.DONE
              )}
              handleRemoveItem={handleRemoveItem}
              type={ColumnTypesEnum.DONE}
              handleAddItem={handleAddItem}
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
