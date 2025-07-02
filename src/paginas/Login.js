import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useFormulario } from "../hooks/useFormulario";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const urlAPI = process.env.REACT_APP_URL_API;
  const { setLogueado } = useContext(UserContext);
  const [error, setError] = useState("");
  const [credenciales, setCredenciales] = useState({
    nombreUsuario: "",
    contrasenya: "",
  });
  const navigate = useNavigate();

  const { setDato, datosFormulario } = useFormulario(credenciales);

  const enviarCredenciales = async () => {
    const resp = await fetch(`${urlAPI}usuarios/login`, {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(datosFormulario),
    });
    if (!resp.ok) {
      const { message } = await resp.json();
      setError(message);
    } else {
      const { token } = await resp.json();
      setLogueado(true);
      setError("");
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  const comprobarCredenciales = () => {
    const { nombreUsuario, contrasenya } = datosFormulario;
    return nombreUsuario === "" || contrasenya === "" ? false : true;
  };

  return (
    <main>
      <h1 className="text-center">Logeate primero, no?</h1>
      <div className="row justify-content-center">
        <div className="col-6">
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (comprobarCredenciales()) {
                setError("");
                enviarCredenciales();
              } else {
                setError("Credenciales incorrectas!");
              }
            }}
          >
            <div className="form-group">
              <label htmlFor="nombreUsuario">Nombre de usuario:</label>
              <input
                type="text"
                name="nombreUsuario"
                id="nombreUsuario"
                className="form-control"
                value={datosFormulario.nombreUsuario}
                onChange={setDato}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contrasenya">Contraseña</label>
              <input
                type="password"
                name="contrasenya"
                id="contrasenya"
                className="form-control"
                value={datosFormulario.contrasenya}
                onChange={setDato}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </div>
            <div className="form-group text-danger bolder">{error}</div>
          </form>
        </div>
      </div>
    </main>
  );
};
