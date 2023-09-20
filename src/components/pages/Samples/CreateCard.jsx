import { Link } from "react-router-dom";

const CreateCard = () => {
    return( 
        <div className="create-card">
            <Link to="/edit-sample" className="full-button">New Sample</Link>
        </div>
    );
}

export default CreateCard;