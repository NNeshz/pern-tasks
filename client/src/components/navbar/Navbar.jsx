import { Link, useLocation } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./navigation.js";
import { useAuth } from "../../context/authContext.jsx";

function Navbar() {
  const location = useLocation();
  const { isAuth, signout } = useAuth();

  return (
    <nav className="bg-zinc-950 flex justify-between items-center px-20 py-4">
      <Link to="/tasks">
        <h1 className="text-white font-bold text-2xl">PERN Task</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuth ? (
          <>
            {privateRoutes.map(({ path, name }) => (
              <li
                key={path}
                className={`text-white px-3 py-1 ${
                  location.pathname === path ? "bg-zinc-900" : "bg-zinc-950"
                }`}
              >
                <Link to={path}>{name}</Link>
              </li>
            ))}
            <li onClick={() => signout()} className="px-3 py-1 bg-red-600 rounded-sm">Logout</li>
          </>
        ) : (
          publicRoutes.map(({ path, name }) => (
            <li
              key={path}
              className={`text-white px-3 py-1 ${
                location.pathname === path ? "bg-zinc-900" : "bg-zinc-950"
              }`}
            >
              <Link to={path}>{name}</Link>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
