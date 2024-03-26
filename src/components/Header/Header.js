import "./Header.scss"

function Header({isToggleActive, toggle}) {
    return (
        <header className="header">
            <h1 className="header__title">Hogsmeade Hoard</h1>
            <div className={isToggleActive ? "toggle active" : "toggle" } onClick={toggle}></div>
          </header>
    )
}

export default Header;