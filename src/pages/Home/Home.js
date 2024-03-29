import bgVideo from "../../assets/images/bg-video.mp4";
import "./Home.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";

function Home() {
  const [isToggleActive, setIsToggleActive] = useState(false);

  const toggleClass = () => {
    setIsToggleActive(!isToggleActive);
  }


  return (
    <section>
      <section className={isToggleActive ? "wrapper active" : "wrapper"}>
        {/* TODO: ADD BACK LOOP TO VIDEO !!!!!!!!!!!!!! */}
        <video className="bgvideo" src={bgVideo} muted loop autoPlay></video>
        <div className="overlay"></div>

        <section className="home">
          <Header isToggleActive={isToggleActive} toggle={toggleClass} />

          <section className="hero">
            <h2 className="hero__title">
              Enchanted Treasures Await
            </h2>
            <p className="hero__description">
              Step into a realm where magic breathes and whispers. Discover
              enchanted artifacts, mystical tomes, and arcane relics that bridge
              the worlds between the seen and unseen. Your adventure begins
              here.
            </p>
            <Link className="hero__btn" to={"/shop"}>Explore</Link>
          </section>
        </section>
      </section>

      <Menu />
    </section>
  );
}

export default Home;
