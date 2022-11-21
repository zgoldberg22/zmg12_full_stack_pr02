import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';

const TaskTable = (props) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 550 }}>
        <TableHead id="table-heading">
          <TableRow>
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell>
              <strong>Description</strong>
            </TableCell>
            <TableCell>
              <strong>Deadline</strong>
            </TableCell>
            <TableCell>
              <strong>Priority</strong>
            </TableCell>
            <TableCell>
              <strong>Is Complete</strong>
            </TableCell>
            <TableCell>
              <strong>Action</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell>{row.title}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.deadline}</TableCell>
              <TableCell align="center">{row.priority}</TableCell>
              <TableCell align="center">
                <Checkbox size="small" />
              </TableCell>
              <TableCell>
                <Stack direction="column">
                  {/* might need to add another prop for isComplete because can't pass props from child to parent */}
                  {row.isComplete === false && (
                    <Button
                      id="update-btn"
                      variant="contained"
                      size="small"
                      color="primary"
                    >
                      Update
                    </Button>
                  )}
                  <Button size="small" color="warning" variant="contained">
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
