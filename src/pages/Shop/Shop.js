import { useState } from "react";
import Menu from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";

function Shop() {
    const [isToggleActive, setIsToggleActive] = useState(false);
    const toggleClass = () => {
        setIsToggleActive(!isToggleActive);
      }


    return (
        <div>
            <section className="shop">
                <Header isToggleActive={isToggleActive} toggle={toggleClass} />
            </section>

            <Menu />
        </div>
    )
}

export default Shop;