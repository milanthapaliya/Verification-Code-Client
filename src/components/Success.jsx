import {useNavigate} from "react-router-dom";

const Success = ({ message }) => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };
    return (
        <div className="success-container">
            <div className="success-message">Code Verified Successfully</div>
            <button className="home-button" onClick={goToHome}>Go to Home</button>
        </div>
    );
};

export default Success;
