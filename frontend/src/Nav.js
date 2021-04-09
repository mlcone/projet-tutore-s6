import React from "react";
import './App.css';
import { Link } from 'react-router-dom';

function Nav() {

    const navStyle = {
        color: 'white'
    };

    return (
        <nav>
            <h3>MySteamLibrary</h3>
            <ul className="nav-links">
                <Link style={navStyle} to='/login'>
                    <li>Se connecter</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;