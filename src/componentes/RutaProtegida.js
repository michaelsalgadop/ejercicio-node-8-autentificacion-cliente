import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const RutaProtegida = (props) => {
  const { children } = props;
  const { logueado } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!logueado) {
      navigate("/login");
    }
  }, [navigate, logueado]);
  return children;
};
