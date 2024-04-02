import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";
import bg from "../../assets/images/bg-img.jpeg";
import back from "../../assets/icons/back.png";
import Api from "../../utils/Api";
import "./Product.scss";
import ImageGallery from "../../components/ImageGallery/ImageGallery";

function Product() {
  const theId = useParams().id;
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const api = new Api();
    const getProduct = async () => {
      try {
        const productResult = await api.getProduct(theId);
        setProduct(productResult);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, []);

  const toggleClass = () => {
    setIsToggleActive(!isToggleActive);
  };

  console.log(product);
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

          {product && (
            <section className="product-details">
                <img className="product-details__back" src={back}/>
              <div className="product-main">
                <ImageGallery images={product.images} />
                <section className="product-main__right">
                  <h2>{product.product_name}</h2>
                  <p>{product.description}</p>
                  <div className="price">
                  {product.price_g!==0 && <p className="product-card__price__g">{product.price_g} Galleons</p>}
                {product.price_s!=0 && <p className="product-card__price__g">{product.price_s} Sickles</p>}
                {product.price_c!=0 && <p className="product-card__price__g">{product.price_c} Knuts</p>}
                  </div>
                  <button>+ Add</button>
                </section>
              </div>
            </section>
          )}
        </section>
      </section>

      <Menu />
    </div>
  );
}

export default Product;
