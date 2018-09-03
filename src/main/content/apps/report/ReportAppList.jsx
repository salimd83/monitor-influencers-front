import React from "react";
import { Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";

const rows = [
  { calories: 0, fat: 5, carbs: 10, protein: 15, vitamin: 5, name: 'test' },
  { calories: 0, fat: 5, carbs: 10, protein: 15, vitamin: 5, name: 'test' },
  { calories: 0, fat: 5, carbs: 10, protein: 15, vitamin: 5, name: 'test' },
  { calories: 0, fat: 5, carbs: 10, protein: 15, vitamin: 5, name: 'test' },
  { calories: 0, fat: 5, carbs: 10, protein: 15, vitamin: 5, name: 'test' },
]

const ReportAppList = () => {
  return (
    <div className="m-32 lazyloading">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Metrics</TableCell>
            <TableCell numeric>Profile one</TableCell>
            <TableCell numeric>Profile 2</TableCell>
            <TableCell numeric>profile 3</TableCell>
            <TableCell numeric>profile 4</TableCell>
            <TableCell numeric>profile 5</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {['name', 'calories', 'fat', 'carbs', 'protein', 'vitamin'].map((matric) => {
            return (
              <TableRow key={rows.id}>
                <TableCell component="th" scope="row">
                  {matric}
                </TableCell>
                <TableCell numeric>{rows[0][matric]}</TableCell>
                <TableCell numeric>{rows[1][matric]}</TableCell>
                <TableCell numeric>{rows[2][matric]}</TableCell>
                <TableCell numeric>{rows[3][matric]}</TableCell>
                <TableCell numeric>{rows[4][matric]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportAppList;
