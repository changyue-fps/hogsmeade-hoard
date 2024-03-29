import "./ShopInfo.scss";

function ShopInfo({shop}) {
    const logo = process.env.REACT_APP_BASE_URL + shop.logo;

    console.log(logo);
    return (
        <section className="shop-info">
            <img className="shop-info__image" src={logo} />
            <p className="shop-info__intro">{shop.intro}</p>
        </section>
    )
}

export default ShopInfo;