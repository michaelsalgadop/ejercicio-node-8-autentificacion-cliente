import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { UserContext } from "./context/UserContext";

import { Cabecera } from "./componentes/Cabecera";
import { Login } from "./paginas/Login";
import { Inicio } from "./paginas/Inicio";
import { Listado } from "./paginas/Listado";
import { PageNotFound } from "./componentes/PageNotFound";

function App() {
  const [items, setItems] = useState([]);
  const urlAPI = process.env.REACT_APP_URL_API;

  const estaLogueado = () => !!localStorage.getItem("token"); // Es igual que ponerlo así: localStorage.getItem("token") ? true : false;
  const [logueado, setLogueado] = useState(estaLogueado());

  const cargarItems = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLogueado(false);
        return;
      }
      const resp = await fetch(`${urlAPI}items/listado`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { listadoItems } = await resp.json();
      setItems(listadoItems);
    } catch (error) {
      console.error(`Error obteniendo items del usuario ${error.message}`);
    }
  }, [urlAPI, logueado]);

  useEffect(() => {
    cargarItems();
  }, [cargarItems]);

  return (
    <UserContext.Provider
      value={{
        logueado,
        setLogueado,
        items,
      }}
    >
      <Router>
        <div className="container-fluid">
          <Cabecera></Cabecera>
          <Routes>
            <Route path="/" element={logueado ? <Inicio /> : <Login />}></Route>
            <Route
              path="/listado"
              element={logueado ? <Listado /> : <Login />}
            ></Route>
            <Route
              path="/login"
              element={logueado ? <Navigate to="/" replace /> : <Login />}
            ></Route>
            <Route path="/inicio" element={<Navigate to="/" replace />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
