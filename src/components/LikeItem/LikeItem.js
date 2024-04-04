import deleteIcon from "../../assets/icons/delete.png";
import "./LikeItem.scss";
import { useAuth } from '../../utils/AuthContext';
import axios from "axios";

function LikeItem({product, onDeleted }) {
    const images = product.images;
    const mainImage = images.find(image => image.main);
    const mainImageUrl = process.env.REACT_APP_BASE_URL + mainImage.image_url;

    const { currentUser, setAuthToken } = useAuth();

    // const handleDelete = async () => {
    //     const token = localStorage.getItem('userToken');
    //     setAuthToken(token); 
    
    //     try {
    //       await axios.delete(`http://localhost:8080/api/user/likes/${product.id}`, {
    //         headers: {
    //           Authorization: `Bearer ${token}` // Include the Authorization header directly
    //         }
    //       });
    //       onDeleted(product.id); // Callback to update the UI accordingly
    //       console.log('Like deleted successfully');
    //     } catch (error) {
    //       console.error('Failed to delete like:', error);
    //     }
    // };
    return (
        <div className="likeitem">
            <div className="likeitem__img__wrapper"><img className="likeitem__img" src={mainImageUrl}/></div>
            <p className="likeitem__name">{product.product_name}</p>
            <img className="likeitem__delete" src={deleteIcon} onClick={onDeleted}/>
        </div>
    )
}

export default LikeItem;