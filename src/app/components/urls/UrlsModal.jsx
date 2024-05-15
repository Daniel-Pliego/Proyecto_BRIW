import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { DataGrid } from '@mui/x-data-grid';
import { HandlerEdit, HandlerIndexar } from '../../commands/HandlerCommand';
import NewUrlForm from './NewUrlForm';
import { UrlData } from '../Interface';
import HandlerManager from '../../commands/HandlerManager';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(new UrlData({
    name: '',
    url: '',
    frecuency: '',
    id_profile: 1,
  }));

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleTextFieldChange = (event, fieldName, setFormData) => {
    const value = event.target.value;
    setFormData(prevData => {
      const newData = { ...prevData };
      newData[fieldName] = value;
      return newData;
    });
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Agregar URL</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: '50%' }}>
          <h2 id="child-modal-title">Agregar URL</h2>
          <p id="child-modal-description">
            Formulario para agregar un Url al perfil de búsqueda.
          </p>
          <NewUrlForm
          setFormData={setFormData}
          onTextFieldChange={handleTextFieldChange}
          />
          <Button onClick={() => {
              const manager = new HandlerManager();
              manager.insertURL(formData); 
              handleClose();
          }}>
              Guardar
          </Button>

        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function UrlModal({ urls }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { 
      field: 'nombre', 
      headerName: 'Nombre', 
      flex: 0.5,
      valueGetter: (value, row) => `${row.name || ''}`
    },
    { 
      field: 'url', 
      headerName: 'URL', 
      flex: 1.8, 
      sortable: false,
      valueGetter: (value, row) => `${row.url || 'No hay url'}`
    },
    { 
      field: 'indexado', 
      headerName: 'Indexado', 
      flex: 0.5,
      valueGetter: (value, row) => (row.visited === 1 ? 'Si' : 'No')
    },
    {
      field: 'frecuencia',
      headerName: 'Frecuencia (hrs)',
      description: 'Esta columna indica cada cuántas horas se consulta la URL de manera automática.',
      flex: 0.5,
      valueGetter: (value, row) => row.frecuency ? row.frecuency : 'No hay'
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      description: 'Esta columna contiene los botones para borrar o editar la URL.',
      flex: 2, 
      sortable: false,
      renderCell: (row) => (
        <strong>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            style={{ marginRight: '5%' }}
            onClick={(event) => {
              event.stopPropagation(); 
              const manager = new HandlerManager();
              manager.deleteURL(row.row); 
            }}
          >
            Borrar
          </Button>
          <Button
            variant="outlined"
            startIcon={<BuildIcon />}
            style={{ marginRight: '5%' }}
            onClick={(event) => {
              event.stopPropagation(); 
              HandlerEdit(); 
            }}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            startIcon={<SendIcon />}
            style={{ marginRight: '5%' }}
            onClick={(event) => {
              event.stopPropagation(); 
              HandlerIndexar(); 
            }}
          >
            Indexar
          </Button>
        </strong>
      )
    }
    
  ];

const firstRow = urls[0];
const isUrlNull = firstRow && firstRow.url === null;
const filteredRows = isUrlNull ? [] : urls;


  return (
    <div>
      <Button onClick={handleOpen} variant="contained" endIcon={<BuildIcon />}>
        Editar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '70%'}}>
          <h2 id="parent-modal-title">Perfil de Busqueda</h2>
          <p id="parent-modal-description">
            Aquí se ve el formulario para agregar, eliminar o editar una URL.
          </p>

          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}