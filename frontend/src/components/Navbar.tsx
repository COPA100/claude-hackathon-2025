import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
    return (
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur shadow-sm">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between">
                <Link
                    to="/"
                    className="pl-2 text-md flex gap-1 items-center font-semibold text-purple-600 hover:text-purple-700"
                >
                    <img
                        src={logo}
                        className="w-12 h-12 overflow-hidden scale-120 mt-1"
                    ></img>
                    Research Atlas
                </Link>
                <nav className="flex pr-4 items-center gap-6 text-md text-gray-600">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:text-purple-600 transition-colors ${
                                isActive ? "text-purple-600 font-medium" : ""
                            }`
                        }
                    >
                        Listings
                    </NavLink>
                    <NavLink
                        to="/applicants"
                        className={({ isActive }) =>
                            `hover:text-purple-600 transition-colors ${
                                isActive ? "text-purple-600 font-medium" : ""
                            }`
                        }
                    >
                        Applicants
                    </NavLink>
                    <NavLink
                        to="/recruiting"
                        className={({ isActive }) =>
                            `hover:text-purple-600 transition-colors ${
                                isActive ? "text-purple-600 font-medium" : ""
                            }`
                        }
                    >
                        Recruiting
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
