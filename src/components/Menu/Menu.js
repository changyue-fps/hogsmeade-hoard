import { Link } from "react-router-dom";
import "./Menu.scss";
import { useAuth } from '../../utils/AuthContext';

function Menu() {
  const { currentUser } = useAuth();
  const { logout } = useAuth();


    return (
        <div class="menu">
        <ul>
          <li><Link className="menu-item" to={"/"}>Home</Link></li>
          <li><Link className="menu-item" to={"/shop"}>Shop</Link></li>
          {currentUser ? (
          <>
            <li><Link className="menu-item" to="/user">Profile</Link></li>
            <li className="menu-item" onClick={logout}>Logout</li>
          </>
        ) : (
          <>
            <li><Link className="menu-item" to="/login">Login</Link></li>
            <li><Link className="menu-item" to="/signup">Signup</Link></li>
          </>
        )}
          <li><Link className="menu-item">About Us</Link></li>
        </ul>
      </div>
    )
}

export default Menu;