import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Listado = () => {
  const { items } = useContext(UserContext);
  return (
    <main>
      <h1>Aquí tienes un listado de tus items:</h1>
      {items?.length > 0 ? (
        <ul>
          {items.map(({ _id, nombre }) => {
            return <li key={_id}>{nombre}</li>;
          })}
        </ul>
      ) : (
        <p>No tienes items a mostrar majete :)</p>
      )}
    </main>
  );
};
