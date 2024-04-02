import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";
import bg from "../../assets/images/bg-img.jpeg";
import back from "../../assets/icons/back.png";
import Api from "../../utils/Api";
import "./Login.scss";

function Login() {
  const [isToggleActive, setIsToggleActive] = useState(false);
  
  useEffect(() => {
    const api = new Api();
    
  }, []);

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
        <section className="login">
          <Header isToggleActive={isToggleActive} toggle={toggleClass} />

          <section className="login-main">

          </section>
        </section>
      </section>

      <Menu />
    </div>
  );
}

export default Login;
