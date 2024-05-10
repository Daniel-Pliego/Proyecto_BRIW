"use client";
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { headers } from '../../../next.config';

function groupProfiles(array) {
  return array.reduce((groups, elemento) => {
    const existingGroup = groups.find(group => group[0].perfil_busqueda_id === elemento.perfil_busqueda_id);
    if (existingGroup) {
      existingGroup.push(elemento);
    } else {
      const nuevoGrupo = [elemento];
      nuevoGrupo.nombre_perfil_busqueda = `${elemento.nombre_perfil_busqueda}`;
      groups.push(nuevoGrupo);
    }
    return groups;
  }, []);
}

// function generateRows(groupedProfiles) {
//   groupedProfiles.forEach((profileGroup, index) => {
//     const numero = index + 1;
//     const nombre = profileGroup[0].nombre_perfil_busqueda;
//     const tamaño = profileGroup.length;
//     const row = { numero, nombre, tamaño };
//     console.log("1 row CREADA: ", row);
//     rows.push(row);
//   });
// }

export default function SearchProfileTable({ profiles }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (profiles.length > 0) {
      console.log("perfiles: ", profiles);
      console.log("--------------------------------------");

      console.log("rows: ", rows);
      console.log("--------------------------------------");

      const groupedProfiles = groupProfiles(profiles);
      console.log("groupedProfiles: ", groupedProfiles);
      console.log("--------------------------------------");

      const newRows = generateRows(groupedProfiles, rows);
      setRows(newRows);
    }
  }, [profiles]);
  
  return (
    // <div>
    //     <h1>Emiliano Valencia Guzmán</h1>
    //     <h1>Search Profile Tableeeeeeeeeeee</h1>
    // </div>

    <TableContainer component={Paper}> 
       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">

        <TableHead>
          <TableRow>
            <TableCell align='center'>Perfil de busqueda</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">#URLS</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center'>
                {row.number}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
  );
}

function generateRows(groupedProfiles) {
  const newRows = groupedProfiles.map((profileGroup, index) => {
    const number = index + 1;
    const name = profileGroup[0].nombre_perfil_busqueda;
    const length = profileGroup.length;
    const row = { number, name, length };
    return row;
  });
  return newRows;
}