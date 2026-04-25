import { useState } from "react";

function App() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [show, setShow] = useState(false);

  const showName = (e) => {
    e.preventDefault();

    if (fName && lName) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <div className="container">
      <h1>Full Name Display</h1>

      <form onSubmit={showName}>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {show && (
        <h3>
          Full Name: {fName} {lName}
        </h3>
      )}
    </div>
  );
}

export default App;