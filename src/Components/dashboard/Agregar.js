import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setDepartments,
  setOccupations,
  setPersons,
} from "../../store/reducers/censo";
import {
  getCitiesByDepartment,
  getOccupations,
  getDepartments,
  addPeople,
  getPeoples,
} from "../ApiProviders";

const Agregar = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.censo.departments);
  const occupations = useSelector((state) => state.censo.occupations);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(null);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [date, setDate] = useState("");
  const [occu, setOccu] = useState(null);
  const apikey = localStorage.getItem("token");
  const iduser = localStorage.getItem("idUsuario");

  useEffect(() => {
    if (apikey && iduser) {
      (async () => {
        try {
          const departResp = await (
            await getDepartments(apikey, iduser)
          ).json();
          const occuResp = await (await getOccupations(apikey, iduser)).json();
          dispatch(setDepartments(departResp.departamentos));
          dispatch(setOccupations(occuResp.ocupaciones));
        } catch (error) {}
      })();
    }
  }, [apikey, dispatch, iduser]);

  useEffect(() => {
    if (department) {
      (async () => {
        const citiesResp = await (
          await getCitiesByDepartment(apikey, iduser, department)
        ).json();
        setCities(citiesResp.ciudades);
      })();
    }
  }, [apikey, department, iduser]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleChangeOccupation = (e) => {
    setOccu(e.target.value);
  };

  const handleChangeDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleAddPerson = async (e) => {
    e.preventDefault();
    if (!name || !department || !city || !occu || !date)
      return alert("You must input data to all fields");

    await addPeople(apikey, iduser, {
      idUsuario: iduser,
      nombre: name,
      departamento: department,
      ciudad: city,
      fechaNacimiento: date,
      ocupacion: occu,
    });
    const peoplsResp = await (await getPeoples(apikey, iduser, iduser)).json();
    dispatch(setPersons(peoplsResp.personas));
  };

  return (
    <div className="box">
      <h2>Agregar Persona</h2>
      <form className="agregar-form">
        <div className="controls">
          <input
            className="controls"
            placeholder="Nombre Completo"
            type="text"
            id="nombre"
            onChange={handleChangeName}
          />
        </div>

        <div className="controls">
          <select
            className="controls"
            id="departamentosSelect"
            onChange={handleChangeDepartment}
          >
            <option>none</option>
            {departments.map((depart) => (
              <option key={depart.id} value={depart.id}>
                {depart.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="controls">
          <select id="ciudades-select" onChange={handleChangeCity}>
            <option>none</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="controls">
          <label htmlFor="fnac">Fecha Nacimiento </label>
          <input
            className="controls"
            id="fnac"
            type="date"
            onChange={handleChangeDate}
          />
        </div>

        <div className="controls">
          <select id="ocupacion" required="" onChange={handleChangeOccupation}>
            <option>none</option>
            {occupations.map((occu) => (
              <option key={occu.id} value={occu.id}>
                {occu.ocupacion}
              </option>
            ))}
          </select>
        </div>

        <button className="buttons" type="submit" onClick={handleAddPerson}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Agregar;
