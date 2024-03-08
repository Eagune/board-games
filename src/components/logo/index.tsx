import { NavLink } from 'react-router-dom';

function Logo() {

    return (
        <NavLink to="/" className="no-underline">
            <button className="font-semibold text-white">
                桌游平台创作端
            </button>
        </NavLink>
    );
}

export default Logo;
