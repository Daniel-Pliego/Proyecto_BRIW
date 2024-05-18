import React, { useState, useEffect } from "react";
import db from "../../../infra/database/libs/db";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function createData (id, name, subido) {
  return { id, name, subido };
}

const rows = [
  createData(1, "Frozen yoghurt", "2021-10-10"),
  createData(2, "Ice cream sandwich", "2021-10-10"),
  createData(3, "Eclair", "2021-10-10"),
  createData(4, "Cupcake", "2021-10-10"),
];

export default function DocumentsTable () {
  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch("/api/documents", {
  //           method: "GET",
  //         });
  //         const data = await response.json();
  //         setData(data);
  //       } catch (error) {
  //         console.log("Error fetching documents", error);
  //       }
  //     };
  //     fetchData();
  //   }, []);
  return (
    <div className="container px-8 mx-auto mt-8">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Subido</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.subido}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="error">
                    Borrar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

// return (
//     <table className="w-full">
//       <thead>
//         <tr>
//           <th className="p-2 text-left">Nombre</th>
//           <th className="p-2 text-left">Tipo</th>
//           <th className="p-2 text-left">Tamaño</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="p-2">document.name</td>
//           <td className="p-2">document.type</td>
//           <td className="p-2">document.size bytes</td>
//         </tr>
//       </tbody>
//     </table>
//   );
