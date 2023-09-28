import { Link } from "react-router-dom";

/**
 * Creates create card for user to open a new sample
 * on the edit samples screen.
 * @returns Create card React DOM.
 */
export default function CreateCard() {
    return( 
        <div className="create-card">
            <Link to="/edit-sample" className="full-button">New Sample</Link>
        </div>
    );
}
 