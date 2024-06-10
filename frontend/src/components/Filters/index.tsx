import { IPostState } from "@/requests/posts";
import {
  FilterData,
  ILabel,
  ILabelForInterface,
  IState,
  IStateForInterface,
} from "@/requests/request";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

interface IFilters {
  filters: FilterData;
  setFilters: (data: FilterData) => void;
  stateEnum: typeof IPostState | typeof IState;
}

export enum IFilterStateForInterface {
  OPENED = "Відкрито",
  CANCELED = "Відмінено",
  CLOSED = "Закрито",
  PENDING = "Очікує на допомогу",
  IN_WORK = "Виконується",
  COMPLETED = "Виконано",
}

export const Filters = ({ filters, setFilters, stateEnum }: IFilters) => {
  return (
    <Box
      sx={{
        button: {
          fontSize: "14px",
          textTransform: "none",
          padding: "5px",
          boxSizing: "border-box",
          borderRadius: "25px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography>
          <b>Пошук:</b>
        </Typography>
        <TextField
          value={filters.search}
          onChange={(e) => {
            setFilters({ ...filters, search: e.target.value });
          }}
          variant="filled"
          color="success"
          focused
          label="Пошук"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography>
          <b>Тип потрібної допомоги:</b>
        </Typography>
        <Button
          onClick={() => setFilters({ ...filters, label: "" })}
          sx={{
            border: "2px solid #496F5D",
            color: filters.label === "" ? "#FFFFFF" : "#496F5D",
            background: filters.label === "" ? "#496F5D !important" : "#FFFFFF",
          }}
        >
          Усі
        </Button>
        {Object.values(ILabel).map((item) => (
          <Button
            key={item}
            onClick={() => setFilters({ ...filters, label: item })}
            sx={{
              border: "2px solid #496F5D",
              color: filters.label === item ? "#FFFFFF" : "#496F5D",
              background:
                filters.label === item ? "#496F5D !important" : "#FFFFFF",
            }}
          >
            {ILabelForInterface[item]}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography>
          <b>Стан:</b>
        </Typography>
        <Button
          onClick={() => setFilters({ ...filters, state: "" })}
          sx={{
            border: "2px solid #496F5D",
            color: filters.state === "" ? "#FFFFFF" : "#496F5D",
            background: filters.state === "" ? "#496F5D !important" : "#FFFFFF",
          }}
        >
          Усі
        </Button>
        {Object.values(stateEnum).map((item) => (
          <Button
            key={item}
            onClick={() => setFilters({ ...filters, state: item })}
            sx={{
              border: "2px solid #496F5D",
              color: filters.state === item ? "#FFFFFF" : "#496F5D",
              background:
                filters.state === item ? "#496F5D !important" : "#FFFFFF",
            }}
          >
            {IFilterStateForInterface[item]}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
