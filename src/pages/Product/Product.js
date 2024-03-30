import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";
import bg from "../../assets/images/bg-img.jpeg";
import Api from "../../utils/Api";
import "./Product.scss";
import "../Shop/Shop.scss";

function Product() {
    const [isToggleActive, setIsToggleActive] = useState(false);

    const toggleClass = () => {
        setIsToggleActive(!isToggleActive);
      };
  return (
    <div>
      <section
        className={isToggleActive ? "wrapper-main active" : "wrapper-main"}
      >
        <img className="bg" src={bg} />
        <div className="bg-overlay"></div>
        <div className="bg-white"></div>
        <section className="product">
          <Header isToggleActive={isToggleActive} toggle={toggleClass} />

          <section className="product-details">
            
          </section>

        
        </section>
      </section>

      <Menu />
    </div>
  );
}

export default Product;
