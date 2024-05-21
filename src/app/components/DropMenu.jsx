import React, { useState } from "react";

function DropdownMenu () {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  function createData (id, name) {
    return { id, name };
  }

  const rows = [
    createData(1, "Frozen yoghurt"),
    createData(2, "Ice cream sandwich"),
    createData(3, "Eclair"),
    createData(4, "Cupcake"),
    createData(5, "Gingerbread"),
  ];

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Seleccione usuario</h2>
      <select
        className="block px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Seleccione usuario</option>
        {rows.map((row) => (
          <option key={row.id} value={row.name}>
            {row.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownMenu;
