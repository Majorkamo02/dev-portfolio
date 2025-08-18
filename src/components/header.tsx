import { NavLink } from "react-router-dom"
import '../css/header.css'


function Header() {
    return (
        <>
            <header>
                <span className="header-name">Cameron Jolly</span>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/Portfolio">Portfolio</NavLink>
                    <NavLink to="/Contact">Contact</NavLink>
                </nav>
            </header>
        </>
    )
}

export default Header