import React from "react";
import { useSelector } from "react-redux";

const Censados = ({ location }) => {
  const departments = useSelector((state) => state.censo.departments);
  const persons = useSelector((state) => state.censo.persons);
  const montevideoId = departments.filter((el) => el.nombre === "Montevideo")[0]
    ?.id;
  return (
    <div className="boxC">
      <h2>Censados Totales - {location}</h2>
      <font>
        {persons.length}-
        {location === "Montevideo"
          ? persons.filter((el) => el.departamento === montevideoId).length
          : persons.filter((el) => el.departamento !== montevideoId).length}
      </font>
    </div>
  );
};

export default Censados;
