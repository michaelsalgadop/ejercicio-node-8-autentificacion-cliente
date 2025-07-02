import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const Cabecera = () => {
  const { logueado, setLogueado } = useContext(UserContext);
  const navigate = useNavigate();

  const desloguearse = (e) => {
    e.preventDefault();
    setLogueado(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="row">
      <header className="cabecera espaciado bloque-superior col">
        <nav>
          <ul className="navegacion">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "pointer active" : "pointer"
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/listado"
                className={({ isActive }) =>
                  isActive ? "pointer active" : "pointer"
                }
              >
                Listado
              </NavLink>
            </li>
            <li>
              {logueado ? (
                <button onClick={desloguearse} className="btn-logout pointer">
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "pointer active" : "pointer"
                  }
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
