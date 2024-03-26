import { Link } from "react-router-dom";
import "./Menu.scss";

function Menu() {
    return (
        <div class="menu">
        <ul>
          <li><Link className="menu-item">Home</Link></li>
          <li><Link className="menu-item">Shop</Link></li>
          <li><Link className="menu-item">Login</Link></li>
          <li><Link className="menu-item">Signup</Link></li>
          <li><Link className="menu-item">About Us</Link></li>
        </ul>
      </div>
    )
}

export default Menu;