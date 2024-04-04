import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";
import bg from "../../assets/images/bg-img.jpeg";
import back from "../../assets/icons/back.png";
import Api from "../../utils/Api";
import { useAuth } from '../../utils/AuthContext';
import "./Product.scss";
import axios from 'axios';
import ImageGallery from "../../components/ImageGallery/ImageGallery";

function Product() {
  const theId = useParams().id;
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
  }, [liked]);

  console.log(currentUser);

  const toggleClass = () => {
    setIsToggleActive(!isToggleActive);
  };

  function handleBack() {
    navigate(-1); }


  const handleLike = async () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      try {
        await axios.post('http://localhost:8080/api/user/likes', { "productId": theId }, {
          headers: {
            Authorization: `Bearer ${currentUser.token}` 
          }
        });
        setLiked(true); // Update the liked state
        // Optionally, change the button style or disable it
      } catch (error) {
        console.error('Error adding product to likes', error);
        // Handle error (e.g., showing a message)
      }
    }
  }

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
                <img className="product-details__back" src={back} onClick={handleBack}/>
              <div className="product-main">
                <ImageGallery images={product.images} />
                <section className="product-main__right">
                  <h2>{product.product_name}</h2>
                  <p>{product.description}</p>
                  <div className="price">
                  {product.price_g!==0 && <p className="price__g">{product.price_g} Galleons</p>}
                {product.price_s!=0 && <p className="price__g">{product.price_s} Sickles</p>}
                {product.price_c!=0 && <p className="price__g">{product.price_c} Knuts</p>}
                  </div>
                  <button className="product-btn" onClick={handleLike}>{liked ? "Liked" : "+ Add to Like"}</button>
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
