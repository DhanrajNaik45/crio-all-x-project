import { useEffect, useState } from "react";

function App() {
  const [personsData, setPersonsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  const fetchApiData = async () => {
    try {
      const res = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );

      if (!res.ok) {
        throw new Error("API Error");
      }

      const data = await res.json();
      setPersonsData(data);
    } catch (error) {
      alert("Failed to fetch data");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(personsData.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = personsData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container">
      <h1>Employee Data Table</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {currentRows.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrev}>Previous</button>

        <div className="page-number">{currentPage}</div>

        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;