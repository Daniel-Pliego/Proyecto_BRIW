module.exports = (api) => {
    const isTest = api.env('test');
  
    return {
      presets: [
        // Presets comunes para tu aplicación Next.js
        ['next/babel', { /* Opciones de configuración de Next.js */ }]
      ],
      plugins: [
        // Plugins comunes para tu aplicación Next.js
      ],
      // Añade el preset de desarrollo solo si estás ejecutando pruebas
      ...(isTest && {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
        ],
      }),
    };
  };