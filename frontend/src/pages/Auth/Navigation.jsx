import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";
import "./style/style.css"; // Import CSS file

const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  // Get the authentication status from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.userInfo !== null);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src =
      "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
    script1.type = "module";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://unpkg.com/ionicons@5.2.2/dist/ionicons/ionicons.js";
    script2.setAttribute("nomodule", "");
    document.head.appendChild(script2);

    const list = document.querySelectorAll(".list");

    function activeLink() {
      list.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }

    list.forEach((item) => item.addEventListener("click", activeLink));

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      list.forEach((item) => item.removeEventListener("click", activeLink));
    };
  }, []);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li className={`list ${activeIndex === 0 ? "active" : ""}`}>
            <Link to="/" target="_blank" onClick={() => handleItemClick(0)}>
              <span className="icons">
                <ion-icon name="home"></ion-icon>
              </span>
              <span className="text">Home</span>
              <span className="circle"></span>
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li className={`list ${activeIndex === 1 ? "active" : ""}`}>
                <Link
                  to="/profile"
                  target="_blank"
                  onClick={() => handleItemClick(1)}
                >
                  <span className="icons">
                    <ion-icon name="person"></ion-icon>
                  </span>
                  <span className="text">Profile</span>
                  <span className="circle"></span>
                </Link>
              </li>
              <li className={`list ${activeIndex === 4 ? "active" : ""}`}>
                <Link to="/" target="_blank" onClick={logoutHandler}>
                  <span className="icons">
                    <ion-icon name="log-out-outline"></ion-icon>
                  </span>
                  <span className="text">Logout</span>
                  <span className="circle"></span>
                </Link>
              </li>
            </>
          )}
          <li className={`list ${activeIndex === 2 ? "active" : ""}`}>
            <a
              href="http://127.0.0.1:5500/frontend/src/pages/Map/map.html"
              target="_blank"
              onClick={() => handleItemClick(2)}
            >
              <span className="icons">
                <ion-icon name="locate-outline"></ion-icon>
              </span>
              <span className="text">Map</span>
              <span className="circle"></span>
            </a>
          </li>
          <li className={`list ${activeIndex === 3 ? "active" : ""}`}>
            <Link
              to="/login"
              target="_blank"
              onClick={() => handleItemClick(3)}
            >
              <span className="icons">
                <ion-icon name="log-in-outline"></ion-icon>
              </span>
              <span className="text">Login</span>
              <span className="circle"></span>
            </Link>
          </li>
          <li className={`list ${activeIndex === 4 ? "active" : ""}`}>
            <Link
              to="/settings"
              target="_blank"
              onClick={() => handleItemClick(4)}
            >
              <span className="icons">
                <ion-icon name="settings"></ion-icon>
              </span>
              <span className="text">Settings</span>
              <span className="circle"></span>
            </Link>
          </li>
        </ul>
        <div
          className="indicator"
          style={{ transform: `translateX(calc(70px * ${activeIndex - 2}))` }}
        ></div>
      </div>
    </div>
  );
};

export default Navigation;
