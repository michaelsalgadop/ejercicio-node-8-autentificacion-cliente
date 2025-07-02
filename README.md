# Ejercicio front y back: Autentificación

En este ejercicio crearás dos proyectos, uno para el frontal y otro para la API. Cada uno debe tener un repositorio y una URL de despliegue. El front se desplegará en Netlify y el back se desplegará en Heroku.

### Front

1. Crea una app en React que tenga tres páginas:

- Inicio
- Listado
- Login

2. La app debe tener una cabecera siempre fija en la que haya un menú para navegar a Inicio y a Listado, y cuando el usuario está logueado también debe aparecer un enlace para desloguearse.
3. Las páginas Inicio y Listado sólo se pueden ver si el usuario está logueado. Si el usuario no está logueado, se le redirigirá siempre a Login.
4. La página Inicio tendrá un texto de bienvenida.
5. La página Listado tendrá un listado de items que devuelve la API. A cada usuario le debe devolver sus items.
6. La página Login tendrá un formulario para introducir nombre de usuario y contraseña.

La autentificación debe realizarse por JWT.

### Back

1. Crea una base de datos en Mongo que tenga dos colecciones: usuarios e items. En la colección de items, cada item debe estar relacionado con un usuario.
2. Crea una API REST en Node.js que se conecte a la base de datos anterior. La API tendrá dos endpoints:

(PUT) /usuarios/login -> debe comprobar en base de datos si las credenciales son correctas, y en caso afirmativo devolver un token
(GET) /items/listado -> debe devolver los items del usuario, y sólo debe funcionar si el usuario se ha autentificado
