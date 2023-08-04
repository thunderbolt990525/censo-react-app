import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CensusedList = () => {
  const occupations = useSelector((state) => state.censo.occupations);
  const departments = useSelector((state) => state.censo.departments);
  const persons = useSelector((state) => state.censo.persons);
  const [personList, setPersonList] = useState([]);
  const [occu, setOccu] = useState();

  useEffect(() => {
    if (!occu || occu === "none") {
      setPersonList(persons || []);
    } else {
      setPersonList(persons.filter((o) => o.ocupacion === Number(occu)));
    }
  }, [persons, occu]);

  const handleChangeOccu = (e) => {
    setOccu(e.target.value);
  };
  return (
    <div className="box-8">
      <div className="content-box">
        <h2>
          <font style={{ verticalAlign: "inherit" }}>
            <font style={{ verticalAlign: "inherit" }}>
              List of Censused People
            </font>
          </font>
        </h2>
        <select onChange={handleChangeOccu}>
          <option value="none">Filter by occupation</option>
          {occupations.map((occu) => (
            <option key={occu.id} value={occu.id}>
              {occu.ocupacion}
            </option>
          ))}
        </select>

        <br />
        <table>
          <tbody>
            <tr>
              <th>Full name</th>
              <th>Department</th>
              <th>Occupation</th>
            </tr>
            {personList.map((person) => {
              const occupationOfPerson = occupations.find(
                (occu) => occu.id === person.ocupacion
              )?.ocupacion;

              const departOfPerson = departments.find(
                (depart) => depart.id === person.departamento
              )?.nombre;
              return (
                <tr key={person.id}>
                  <td>{person.nombre}</td>
                  <td>{departOfPerson}</td>
                  <td>{occupationOfPerson}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CensusedList;
