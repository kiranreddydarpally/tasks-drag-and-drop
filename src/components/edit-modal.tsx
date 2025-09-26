import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IdropedItems } from "../utils/dropped-items.interface";
import { ColumnTypesEnum } from "../utils/column-types.enum";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  gap: "12px",
  flexDirection: "column",
};

const EditModal = ({
  open,
  handleClose,
  taskName,
  setOpen,
  taskDueDate,
  handleEditItem,
  taskId,
  subTasks,
  type,
}: {
  open: boolean;
  handleClose: () => void;
  taskName: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskDueDate: string;
  handleEditItem: (
    editName: string,
    editDueDate: string,
    taskId: number,
    subTasks: string[],
    columnType: ColumnTypesEnum
  ) => void;
  taskId: number;
  subTasks: IdropedItems["subTasks"];
  type?: "add";
}) => {
  const [editName, setEditName] = useState(taskName);
  const [editDueDate, setEditDueDate] = useState(taskDueDate);
  const [editSubTaskName, setEditSubTaskName] = useState<string[]>([
    ...(subTasks ?? []),
  ]);
  const [columnType, setcolumnType] = useState(ColumnTypesEnum.NOTSTARTED);

  const handleChange = (event: SelectChangeEvent) => {
    setcolumnType(event.target.value as ColumnTypesEnum);
  };

  useEffect(() => {
    setEditName(taskName);
  }, [taskName]);

  useEffect(() => {
    setEditDueDate(taskDueDate);
  }, [taskDueDate]);

  useEffect(() => {
    setEditSubTaskName([...(subTasks ?? [])]);
  }, [subTasks]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {type === "add" && (
            <>
              <InputLabel id="demo-simple-select-label">
                Select Column Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={columnType}
                label="Age"
                onChange={handleChange}
              >
                {Object.entries(ColumnTypesEnum).map(([key, value]) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
            </>
          )}
          <TextField
            error={editName === ""}
            onChange={(e) => {
              setEditName(e.target.value);
            }}
            required
            id={
              editName === ""
                ? "outlined-error-helper-text"
                : "outlined-required"
            }
            label={editName === "" ? "Error" : "Required"}
            defaultValue={editName}
            value={editName}
            helperText={editName === "" ? "task name cannot be empty." : ""}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(editDueDate)}
              onChange={(e: any) => {
                setEditDueDate(dayjs(e).format("MM/DD/YYYY"));
              }}
            />
          </LocalizationProvider>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>Add subTasks</div>
            <Button
              variant="contained"
              onClick={() => {
                setEditSubTaskName((prev) => [...prev, ""]);
              }}
            >
              Add
            </Button>
          </div>
          {editSubTaskName.map((item, index) => {
            return (
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <TextField
                  onChange={(e) => {
                    const currentSubtasks = [...editSubTaskName];
                    currentSubtasks[index] = e.target.value;
                    setEditSubTaskName(currentSubtasks);
                  }}
                  value={item}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    setEditSubTaskName((prev) => {
                      const filterSubTasks = prev.filter(
                        (filteredItem, filteredIndex) => filteredIndex !== index
                      );
                      return filterSubTasks;
                    });
                  }}
                >
                  Remove
                </Button>
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <Button
              disabled={editName === ""}
              variant="contained"
              onClick={() => {
                handleEditItem(
                  editName,
                  editDueDate,
                  taskId,
                  editSubTaskName,
                  columnType
                );
                setOpen(false);
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
