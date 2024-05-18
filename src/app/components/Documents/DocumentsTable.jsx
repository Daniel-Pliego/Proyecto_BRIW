import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function DocumentsTable() {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/indexer/documents", {
          method: "GET",
        });
        const documents = await response.json();
        console.log(documents);
        const documentsArray = Array.isArray(documents)
          ? documents
          : [documents];

        setDocuments(documentsArray[0].result);
      } catch (error) {
        console.log("Error fetching documents", error);
      }
    };
    fetchData();
  }, []);

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
            {documents.map((document) => (
              <TableRow
                key={document.id_user}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {document.name}
                </TableCell>
                <TableCell align="center">{document.updated}</TableCell>
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
