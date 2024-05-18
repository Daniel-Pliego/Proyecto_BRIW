module.exports = (api) => {
    const isTest = api.env('test');
  
    return {
      presets: [
        ['next/babel', {}]
      ],
      plugins: [
      ],
      ...(isTest && {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
        ],
      }),
    };
  };