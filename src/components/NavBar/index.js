import React from "react";
import "./Navbar.css";
import Search from "../Search";
import { Link } from "react-router-dom";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

function Nav({ search, isConnected, setIsConnected }) {
  const [isactive, setIsactive] = React.useState(false);
  const navigate = useNavigate();

  function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      auth2.disconnect();
      localStorage.clear();
      setIsConnected(false);  
      navigate("/login");
    });
  }

  return (
    <header>
      <Link className="navLogo" to="/">
        YouPlayer
      </Link>
      <div className="menu" onClick={() => setIsactive(!isactive)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className={isactive ? `nav-active` : ``}>
        <Search search={search} isactive={isactive} />
        {isConnected && (
          <div>
            <Link
              // to="/login"
              onClick={logout}
              className={isactive ? "nav__login-active" : "nav__login"}
            >
              Logout
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Nav;
