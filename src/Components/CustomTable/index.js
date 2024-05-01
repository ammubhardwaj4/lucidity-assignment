import React from "react";
import "./style.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)({
  color: "#87c750",
});

function CustomTable({
  columns,
  data,
  isAdmin,
  isVisible,
  handleEdit,
  handleVisibilityToggle,
  handleDelete,
}) {
  return (
    <TableContainer sx={{ backgroundColor: "#1C1C1C", borderRadius: "10px" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ borderBottom: "2px solid #2E2C2C" }}>
            {columns.map((column, index) => (
              <StyledTableCell key={index}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={
                !isAdmin
                  ? { pointerEvents: "none", borderBottom: "2px solid #2E2C2C" }
                  : { borderBottom: "2px solid #2E2C2C" }
              }
            >
              {Object.keys(row).map((key, index) => (
                <TableCell
                  key={index}
                  sx={
                    isVisible[row.name] || !isAdmin
                      ? { color: "grey" }
                      : { color: "white" }
                  }
                >
                  {row[key]}
                </TableCell>
              ))}
              <TableCell>
                <IconButton
                  onClick={() => handleEdit(row)}
                  disabled={isVisible[row.name]}
                >
                  <EditIcon
                    sx={{
                      fontSize: "18px",
                      ...((!isAdmin || isVisible[row.name]) && {
                        color: "grey",
                      }),
                      ...(isAdmin &&
                        !isVisible[row.name] && { color: "green" }),
                    }}
                    className="table-view-icon-action-button"
                  />
                </IconButton>
                <IconButton onClick={() => handleVisibilityToggle(row.name)}>
                  {isVisible[row.name] ? (
                    <VisibilityOff
                      sx={{
                        fontSize: "18px",
                        ...(!isAdmin && { color: "grey" }),
                        ...(isAdmin && { color: "hotpink" }),
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        fontSize: "18px",
                        ...(!isAdmin && { color: "grey" }),
                        ...(isAdmin && { color: "hotpink" }),
                      }}
                      className="table-view-icon-action-button"
                    />
                  )}
                </IconButton>
                <IconButton onClick={() => handleDelete(row)}>
                  <DeleteIcon
                    sx={{
                      fontSize: "18px",
                      ...(!isAdmin && { color: "grey" }),
                      ...(isAdmin && { color: "red" }),
                    }}
                    className="table-view-icon-action-button"
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
