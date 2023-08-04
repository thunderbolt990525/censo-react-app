import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPeoples, getTotalCensus } from "../ApiProviders";
import { setPersons } from "../../store/reducers/censo";
import Agregar from "./Agregar";
import Censados from "./Censados";
import CensusedList from "./CensusedList";
import GraphDepartment from "./GraphDepartment";
import GraphOccupation from "./GraphOccupation";
import GraphEndTime from "./GraphEndTime.js";
import GraphPercentage from "./GraphPercentage";

import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apikey = localStorage.getItem("token");
  const idUsuario = localStorage.getItem("idUsuario");
  const [totalResp, setTotalResp] = useState("");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    (async () => {
      try {
        const peoplsResp = await (
          await getPeoples(apikey, idUsuario, idUsuario)
        ).json();
        setTotalResp(await (await getTotalCensus(apikey, idUsuario)).json());

        dispatch(setPersons(peoplsResp.personas));
        dispatch(setPersons(peoplsResp.personas));
      } catch (error) {
        alert("request failed, try again.");
      }
    })();
  }, [apikey, dispatch, idUsuario]);
  if (apikey && idUsuario) {
    return (
      <>
        <header>
          <h1>CENSO 2023</h1>
          <a href="#" onClick={handleLogout}>
            LogOut
          </a>
        </header>
        <div className="clearfix" />
        <br />
        <div className="col-div-4">
          <Agregar />
        </div>
        <div className="col-div-4">
          <Censados location="Montevideo" />
        </div>
        <div className="col-div-4">
          <Censados location="Resto del Pais" />
        </div>
        <div className="clearfix" />
        <br />
        <div className="col-div-10">
          <CensusedList />
        </div>
        <div className="clearfix" />
        <br />
        <div className="col-div-3">
          <GraphDepartment />
        </div>
        <div className="col-div-3">
          <GraphOccupation />
        </div>
        <div className="col-div-3">
          <GraphEndTime />
        </div>
        <div className="col-div-3">
          <GraphPercentage totalResp={totalResp} />
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default Dashboard;
