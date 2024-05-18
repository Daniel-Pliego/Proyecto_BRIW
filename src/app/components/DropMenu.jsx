import React, { useState, useEffect } from "react";

function DropdownMenu() {
  const [selectedOption, setSelectedOption] = useState("");
  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/indexer/users", {
          method: "GET",
        });
        const users = await response.json();
        const usersArray = Array.isArray(users) ? users : [users];

        setUsers(usersArray[0].result);
        // console.log(users);
      } catch (error) {
        console.log("Error fetching documents", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Seleccione usuario</h2>
      <select
        className="block px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Seleccione usuario</option>
        {users.map((user) => (
          <option key={user.id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownMenu;
