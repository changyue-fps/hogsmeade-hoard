import ShopListItem from "../ShopListItem/ShopListItem";
import "./ShopList.scss";

function ShopList({ products }) {
  return (
    <section className="product-list">
      {products.map((product) => (
        <ShopListItem product={product} />
      ))}
    </section>
  );
}

export default ShopList;
