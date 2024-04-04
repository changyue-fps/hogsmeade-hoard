import { useState, useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";
import bg from "../../assets/images/bg-img.jpeg";
import axios from "axios";
import LikeItem from "../../components/LikeItem/LikeItem";
import Api from "../../utils/Api";
import "./Profile.scss";
import { useAuth } from '../../utils/AuthContext';

function UserProfile() {
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [userLikes, setUserLikes] = useState([]);
  const [isToggleActive, setIsToggleActive] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProductsWithImage = async (likes) => {
      const api = new Api(); // Assuming Api is correctly initialized elsewhere
      try {
        const productDetailsPromises = likes.map(
          (product) => api.getProduct(product.id) // Assuming getProduct returns a Promise
        );
        const productsWithDetails = await Promise.all(productDetailsPromises);
        setUserLikes(productsWithDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const token = localStorage.getItem("userToken");
    axios
      .get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Assuming the response structure is { user: { username, email }, likes: [] }
        setUserInfo(response.data.user);
        if (response.data.likes && response.data.likes.length > 0) {
          fetchProductsWithImage(response.data.likes);
        } else {
          setUserLikes([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, [currentUser]);

  const toggleClass = () => {
    setIsToggleActive(!isToggleActive);
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.delete(`http://localhost:8080/api/user/likes/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // After successful deletion, filter out the like based on productId
      const updatedLikes = userLikes.filter(like => like.id !== productId);
      setUserLikes(updatedLikes);
    } catch (error) {
      console.error("Error deleting like:", error);
      // Optionally, handle the error (e.g., show a message to the user)
    }
  };

  console.log(userInfo);

  return (
    <div>
      <section
        className={isToggleActive ? "wrapper-main active" : "wrapper-main"}
      >
        <img className="bg" src={bg} />
        <div className="bg-overlay"></div>
        <div className="bg-white"></div>
        <section className="profile">
          <Header isToggleActive={isToggleActive} toggle={toggleClass} />

          <section className="profile-main">
            <h2 className="profile__title">User Profile</h2>
            <h2 className="profile__welcome">{`Hello, ${userInfo.user_name}!`}</h2>
            <div className="profile__info">
              <p className="profile__info__lable">Username:</p> <p>{userInfo.user_name}</p>
            </div>
            <div className="profile__info">
              <p className="profile__info__lable">Email:</p> <p>{userInfo.email}</p>
            </div>

            <h2>Likes</h2>
            <ul>
              {userLikes.length > 0 ? (
                userLikes.map((like, index) => <LikeItem product={like} onDeleted={() => handleDelete(like.id)}/>)
              ) : (
                <p>No likes yet.</p>
              )}
            </ul>
          </section>
        </section>
      </section>

      <Menu />
    </div>
  );
}

export default UserProfile;
