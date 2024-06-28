import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context } from "../main";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const handleLogout = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get("http://localhost:5000/user/logout", {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false)
    } catch (error) {
      toast.error("Some Error");
      setIsAuthenticated(true);
      setLoading(false)
    }
  };
  return (
    <nav className="nav">
      <div className="heading">
        <h1>Todo</h1>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={handleLogout} className="btn">
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
