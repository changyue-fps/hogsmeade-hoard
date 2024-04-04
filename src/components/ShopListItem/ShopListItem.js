import { Link } from "react-router-dom";
import "./ShopListItem.scss";

function ShopListItem({product}) {
    const images = product.images;
    const mainImage = images.find(image => image.main);
    const mainImageUrl = process.env.REACT_APP_BASE_URL + mainImage.image_url;
    
    console.log(product.price)
    return (
        <Link className="product-link" to={`/product/${product.id}`}>
        <section className="product-card">
            <div className="product-card__image-wrapper"><img className="product-card__image" src={mainImageUrl}/></div>
            <h3 className="product-card__name">{product.product_name}</h3>
            <div className="product-card__price">
                {product.price_g!==0 && <p className="product-card__price__g">{product.price_g} Galleons</p>}
                {product.price_s!=0 && <p className="product-card__price__g">{product.price_s} Sickles</p>}
                {product.price_c!=0 && <p className="product-card__price__g">{product.price_c} Knuts</p>}
            </div>
        </section>
        </Link>
    );
}

export default ShopListItem;