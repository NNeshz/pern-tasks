import { Link, useLocation } from "react-router-dom";
import { navigation } from "./navigation.js";

function Navbar() {

  const location = useLocation()
  
  return (
    <nav className="bg-zinc-950 flex justify-between px-20 py-4">
      <h1>PERN Task</h1>
      <ul className="flex gap-x-2">
        {navigation.map((item, i) => (
          <li key={i} className={` ${location.pathname === item.path ? "bg-zinc-900 px-2 py-1 text-white rounded-sm" : "bg-zinc-950 text-white px-2 py-1 rounded-sm"}`}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
