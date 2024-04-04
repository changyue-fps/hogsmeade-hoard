import { Link } from "react-router-dom";
import "./Header.scss";
import { useAuth } from '../../utils/AuthContext';

function Header({isToggleActive, toggle}) {
    const { currentUser } = useAuth();
    
    console.log(currentUser);
    return (
        <header className="header">
            <Link className="link" to={"/"}><h1 className="header__title">Hogsmeade Hoard</h1></Link>
            {currentUser ? (<p className="header__user">{`Welcome, ${currentUser.user.user.user_name}`}</p>) : null}
            <div className={isToggleActive ? "toggle active" : "toggle" } onClick={toggle}></div>
          </header>
    );
}

export default Header;