import { Link } from "react-router-dom";

function NavBar () {
  return (
    <nav className="navbar">
      <h1>Mantenimientos</h1>
      <div className="menu">
        <Link to="/">Mantenimientos</Link>
        <Link to="/type">Tipos de mantenimientos</Link>
        <Link to="/odometer">Odómetros registrados</Link>
      </div>
    </nav>
  )
}

export default NavBar