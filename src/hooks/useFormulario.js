import { useState } from "react";

export const useFormulario = (datosUsuario) => {
  const [datosFormulario, setDatosFormulario] = useState(datosUsuario);

  const setDato = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.id]:
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.type === "number"
          ? e.target.valueAsNumber
          : e.target.value,
    });
  };

  return {
    setDato,
    datosFormulario,
  };
};
