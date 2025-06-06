import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropZone from "./components/drop-zone";
import { initialDroppedItems } from "./utils/dropped-items";
import { IdropedItems } from "./utils/dropped-items.interface";
import { ColumnTypesEnum } from "./utils/column-types.enum";
import { Button } from "@mui/material";
import EditModal from "./components/edit-modal";
import dayjs from "dayjs";

const App = () => {
  const [droppedItems, setDroppedItems] =
    useState<IdropedItems[]>(initialDroppedItems);
  const [open, setOpen] = useState<boolean>(false);

  const handleDrop = (item: any) => {
    if (item.type !== item?.items?.type) {
      setDroppedItems((prevItems: IdropedItems[]): any => [
        ...prevItems,
        {
          taskId:
            Math.max(...prevItems.map((item) => item.taskId).filter(Boolean)) +
            1,
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

  const handleEditItem = (
    editName: string,
    editDueDate: string,
    taskId: number,
    subTasks: string[],
    columnType: ColumnTypesEnum
  ) => {
    let updatedItems = [...droppedItems];
    let filteredItems = updatedItems.filter((item) => item.taskId !== taskId);
    let filteredItem = updatedItems.filter((item) => item.taskId === taskId);

    const editItem: IdropedItems = {
      taskId:
        filteredItem[0]?.taskId ??
        Math.max(...filteredItems.map((item) => item.taskId).filter(Boolean)) +
          1,
      name: editName,
      dueDate: editDueDate,
      type: filteredItem[0]?.type ?? columnType,
      subTasks: [...subTasks],
    };
    setDroppedItems([editItem, ...filteredItems]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <h1>Personal </h1>
        <p>A board to keep track of personal tasks.</p>
        <Button
          style={{ marginBottom: "10px" }}
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add tasks
        </Button>
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
              handleEditItem={handleEditItem}
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
              handleEditItem={handleEditItem}
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
              handleEditItem={handleEditItem}
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
              handleEditItem={handleEditItem}
            />
          </div>
        </div>
      </DndProvider>
      <EditModal
        open={open}
        handleClose={handleClose}
        taskName="new Task"
        setOpen={setOpen}
        taskDueDate={dayjs(new Date()).format("MM/DD/YYYY")}
        handleEditItem={handleEditItem}
        taskId={-1}
        subTasks={[]}
        type="add"
      />
    </div>
  );
};

export default App;
