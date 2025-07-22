import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../Css/header.css';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // Check if the user is logged in

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token"); // Clear the token
        localStorage.removeItem("username"); // Clear the username
        localStorage.removeItem("role"); // Clear the role
        navigate("/login"); // Redirect to the login page
        Swal.fire(
          "Logged Out!",
          "You have been successfully logged out.",
          "success"
        );
      }
    });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light gradient-bg">

        <div
          className="container"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80px",
            width: "100%",
          }}
        >
          
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img
                src="/mediheavenlogo.png"
                alt="Logo"
                width="20"
                height="20"
                className="me-2"
              />
              <div className="text-white fw-bold">MediHeaven</div>
            </Link>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {!isLoggedIn && (
                <Link to="/" className="nav-item nav-link text-white fw-bold">
                  Home
                </Link>
              )}
              {!isLoggedIn && (
                <Link to="/features" className="nav-item nav-link text-white fw-bold">
                  Features
                </Link>
              )}
              {!isLoggedIn && (
                <Link to="/aboutus" className="nav-item nav-link text-white fw-bold">
                  About
                </Link>
              )}
              {!isLoggedIn && (
                <Link to="/blogs" className="nav-item nav-link text-white fw-bold">
                  Blogs
                </Link>
              )}
              {!isLoggedIn && (
                <Link to="/card" className="nav-item nav-link text-white fw-bold">
                  Shop
                </Link>
              )}
              {!isLoggedIn && (
                <Link to="/login" className="nav-item nav-link text-white fw-bold">
                  Login
                </Link>
              )}
              {!isLoggedIn && (
                <Link to="/register" className="nav-item nav-link text-white fw-bold">
                  Register
                </Link>
              )}

              {isLoggedIn && (
                <Link to="/" className="nav-item nav-link text-white fw-bold">
                  Home
                </Link>
              )}
              
              {isLoggedIn && (
                <Link
                  to="/addfeedback"
                  className="nav-item nav-link text-white fw-bold"
                >
                  Feedback
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to="/DoctorDetails4P"
                  className="nav-item nav-link text-white"
                >
                  Appointment
                </Link>
              )}
              {isLoggedIn && (
                <Link to="/card" className="nav-item nav-link text-white">
                  Shop
                </Link>
              )}
              {/* {isLoggedIn && (
                <Link to="/Collection" className="nav-item nav-link text-white">
                  New Shop
                </Link>
              )} */}
              {isLoggedIn && (
                <>
                  <Link to="/cart" className="nav-item nav-link text-white">
                    <FaShoppingCart size={20} />
                  </Link>

                  <li className="nav-item dropdown">
                    <span
                      className="nav-link dropdown-toggle text-white"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ cursor: "pointer" }}
                    >
                      <FaUserCircle size={22} />
                    </span>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link className="dropdown-item" to="/dashboard/user">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
