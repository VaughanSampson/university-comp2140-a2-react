import {Link, useLocation} from 'react-router-dom';
import backArrow from '../../icons/arrow-left-solid.svg'

const Header = () => {
    const { pathname } = useLocation();
    return (
        <header className="page-header">
            <div className="header-logo">
                <h2>
                    <Link to="/" className="header-icon-link">SongTrax</Link>
                </h2>
            </div>
            { (pathname==="/")? 
                <div className="header-app-description">
                    <span>Create & Share Location Based Music Samples!</span>
                </div>
                :
                <Link to="/" className="invisible-hyperlink">
                <img className="icon" src={backArrow}></img>
                </Link>
            }
        </header>
    );
}

export default Header;