import { Link } from "react-router-dom";
import "./Header.scss"

function Header({isToggleActive, toggle}) {
    return (
        <header className="header">
            <Link className="link" to={"/"}><h1 className="header__title">Hogsmeade Hoard</h1></Link>
            <div className={isToggleActive ? "toggle active" : "toggle" } onClick={toggle}></div>
          </header>
    )
}

export default Header;