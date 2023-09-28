import { Link, useLocation } from 'react-router-dom';
import backArrowIcon from '../../icons/arrow-left-solid.svg';

/**
 * Create a header component.
 * @returns React DOM header.
 */
export default function Header() {
    const { pathname } = useLocation(); 
    return (
        <header className="page-header">
            <div className="header-logo">
                <h2>
                    <Link to="/" className="header-icon-link">SongTrax</Link>
                </h2>
            </div>
            {
                // Display description or arrow depending on current page.
                (pathname === "/") ?
                    <div className="header-app-description">
                        <span>Create & Share Location Based Music Samples!</span>
                    </div> :
                    <Link to="/" className="invisible-hyperlink">
                        <img className="icon" src={backArrowIcon}></img>
                    </Link>
            }
        </header>
    );
}
