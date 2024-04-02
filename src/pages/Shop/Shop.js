import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";
import bg from "../../assets/images/bg-img.jpeg";
import "./Shop.scss";
import { useParams } from "react-router";
import Api from "../../utils/Api";
import ShopInfo from "../../components/ShopInfo/ShopInfo";
import ShopList from "../../components/ShopList/ShopList";
import { Link } from "react-router-dom";
import { act } from "react-dom/test-utils";

function Shop() {
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [shops, setShops] = useState([]);
  const [activeShop, setActiveShop] = useState(null);
  const [products, setProducts] = useState([]);
  const params = useParams();
  
  useEffect(() => {
    const api = new Api();
    const fetchShops = async () => {
       try {
          const resultShops = await api.getShops();
          setShops(resultShops);
       } catch (error) {
        console.error(error);
       }
    };
    fetchShops();
  }, []);

  useEffect(() => {
    const api = new Api();
    const fetchActiveShop = async (params) => {
        if (shops.length > 0 && shops[0].id) {
            try {
                if (Object.keys(params).length > 0) {
                    const resultShop = await api.getShop(params.id);
                    const resultProducts = await api.getProducts(params.id);
                    setActiveShop(resultShop);
                    setProducts(resultProducts);
                } else {
                    console.log(shops[0].id);
                    const resultShop = await api.getShop(shops[0].id);
                    const resultProducts = await api.getProducts(shops[0].id);
                    setActiveShop(resultShop);
                    setProducts(resultProducts);
                }
            } catch (error) {
                console.error(error);
            }
        };
    }
    fetchActiveShop(params);
  }, [shops, params]);

  const toggleClass = () => {
    setIsToggleActive(!isToggleActive);
  };

  console.log(products);
  return (
    <div>
      <section className={isToggleActive ? "wrapper-main active" : "wrapper-main"}>
        <img className="bg" src={bg} />
        <div className="bg-overlay"></div>
        <div className="bg-white"></div>
        <section className="shop">
          <Header isToggleActive={isToggleActive} toggle={toggleClass} />

           <section className="shops">
            {(shops&&activeShop) && <ul className="shops-list">
                {
                    shops.map((shop) => <li className={(activeShop.id == shop.id) ? "shops-list__item-active" : "shops-list__item"}><Link className="shops-list__item__link" to={`/shop/${shop.id}`}>{shop.shop_name}</Link></li>)
                }
            </ul>}
           
          {activeShop && <ShopInfo shop = {activeShop}/>}
          </section>

          {activeShop && <ShopList products = {products}/>}

        </section>
      </section>

      <Menu />
    </div>
  );
}

export default Shop;
