"use client";
import React, { useState, useEffect } from 'react';
import UrlModal from '../urls/UrlsModal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { HandlerEdit, HandlerDetele } from '../HandlerCommand';

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

export default function SearchProfileTable({ profiles }) {
  const [rows, setRows] = useState([]);
  const [groupedProfiles, setGroupedProfiles] = useState(null); 

  useEffect(() => { 
      const groupedProfiles = groupProfiles(profiles);
      setGroupedProfiles(groupedProfiles);
      const newRows = generateRows(groupedProfiles, rows);
      setRows(newRows);
  }, [profiles]);
  
  return (
    <TableContainer component={Paper}> 
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
  
        <TableHead>
          <TableRow>
            <TableCell align='center'>Perfil de búsqueda</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">#URLS</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
  
        <TableBody>
          {rows.map((row) => {
            const urlsProfile = groupedProfiles.find(profile => profile.nombre_perfil_busqueda === row.name);
            return (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align='center'>
                  {row.number}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.length}</TableCell>
  
                <TableCell align="center">
                  {( <UrlModal urls={urlsProfile} /> )}
                  <Button variant="outlined" startIcon={<DeleteIcon />} 
                    onClick={(event) => {
                    HandlerDetele(); 
                  }}>
                    Borrar
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function generateRows(groupedProfiles) { //mover como función abstracta de otra clase (table)
  const newRows = groupedProfiles.map((groupedProfile, index) => {
    const number = index + 1;
    const name = groupedProfile[0].nombre_perfil_busqueda;
    let length = groupedProfile.length;

    if (verifyLenght(groupedProfile)) {
      length = 0;
    }

    const row = { number, name, length };
    return row;
  });
  return newRows;
}

function verifyLenght (groupedProfile) {
  return groupedProfile.every(item => 
    item.id === null && 
    item.perfil_busqueda_id === null && 
    item.nombre === null && 
    item.url === null && 
    item.visited === null
  );
}