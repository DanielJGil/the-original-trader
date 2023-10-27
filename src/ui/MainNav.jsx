import { NavLink } from "react-router-dom";

function MainNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/dashboard">Home</NavLink>
        </li>
        <li>
          <NavLink to="/trades">Trades</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
