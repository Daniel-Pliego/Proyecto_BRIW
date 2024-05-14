import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { ProfileData } from '../urls/Interface';

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
    const [formData, setFormData] = useState(new ProfileData({
        nombre_perfil_busqueda: '',
    }));
  
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleTextFieldChange = (event, fieldName) => {
      const value = event.target.value;
      setFormData(prevData => {
        const newData = new UrlData(prevData);
        newData[fieldName] = value;
        return newData;
      });
    };
  
    return (
      <React.Fragment>
        <Button onClick={handleOpen} variant="contained">Agrear Perfil de busqueda</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: '50%' }}>
            <h2 id="child-modal-title">Agregar URL</h2>
            <p id="child-modal-description">
              Formulario para agregar un perfil de búsqueda.
            </p>
            {/* <NewUrlForm onTextFieldChange={handleTextFieldChange}/> */}
            <Button onClick={() => {
                //const manager = new HandlerManager();
                //manager.insertURL(formData); 
                handleClose();
            }}>
                Guardar
            </Button>
  
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

export default function NewProfileForm() {

    return (
        <>
        <ChildModal />
        </>
    );

}
