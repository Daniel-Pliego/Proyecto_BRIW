import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function NewUrlForm({ onTextFieldChange }) {
  const [frecuencia, setFrecuencia] = useState('');

  const handleFrecuenciaChange = (event) => {
    const value = event.target.value;

    if (!isNaN(value) && Number.isInteger(parseFloat(value)) && parseInt(value) >= 0) {
      setFrecuencia(value);
    }
  };

  return (
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
            onChange={(e) => onTextFieldChange(e, 'nombre')}
        />
        <TextField required 
            id="outlined-required" 
            label="URL" 
            onChange={(e) => onTextFieldChange(e, 'url')} />
        <TextField
            id="outlined-number"
            label="Frecuencia (Hrs)"
            type="number"
            value={frecuencia}
            onChange={(e) => {
                handleFrecuenciaChange(e);
                onTextFieldChange(e, 'frecuencia');
              }}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                min: 0, 
                step: 1,
          }}
        />
      </div>
    </Box>
  );
}
