import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { ProfileData, UrlData } from '../Interface';
import NewUrlForm from '../urls/NewUrlForm';
import HandlerManager from '../../commands/HandlerManager';
import handleTextFieldChange from '../Services/handleTextFieldChange';

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
  
function NewProfileForm({ setFormData, onTextFieldChange, setFormDataURL}) {
  const [frecuencia, setFrecuencia] = useState('');

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-required"
            label="Nombre"
            onChange={(e) => onTextFieldChange(e, 'name', setFormData)}
          />
        </div>
      </Box>
      <h2 id="child-modal-title">URL</h2>
      <p id="child-modal-description">Formulario para agregar un URL al perfil de búsqueda.</p>
      <Divider />
      <NewUrlForm 
      setFormData={setFormDataURL}
      onTextFieldChange={onTextFieldChange} 
      />
    </>
  );
}

export default function NewProfile() {
  const [open, setOpen] = React.useState(false);
  
  const [formDataProfile, setFormDataProfile] = useState(new ProfileData({
    id_user: 1,
    name: ''
  }));

  const [formDataURL, setFormDataURL] = useState(new UrlData({
    name: '',
    url: '',
    frecuency: '',
  }));

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isSaveButtonDisabled = !(
    formDataProfile.name &&
    formDataURL.name &&
    formDataURL.url
  );
  
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
          <h2 id="child-modal-title">Perfil de busqueda</h2>
          <p id="child-modal-description">
            Formulario para agregar un perfil de búsqueda.
          </p>
          <NewProfileForm 
            setFormData={setFormDataProfile}
            onTextFieldChange={handleTextFieldChange}
            setFormDataURL={setFormDataURL}
          />
          <Button align="right" disabled={isSaveButtonDisabled} onClick={async () => {
              const manager = new HandlerManager();
              formDataURL.id_profile = await manager.insertProfile(formDataProfile); 
              manager.insertURL(formDataURL);
              handleClose();
          }}>
              Guardar
          </Button>

        </Box>
      </Modal>
    </React.Fragment>
  );
}
