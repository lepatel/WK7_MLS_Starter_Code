import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { token, user } = { token: null, user: null }; // Placeholder, replace with useAuth()

  const handleLogin = () => {
    // Your Code Here
  };

  const handleSignup = () => {
    // Your Code Here
  };

  const handleLogout = () => {
    // Your Code Here
  };

  return (
    <Navbar className="header-navbar shadow-sm">
      <Container
        fluid
        className="header-container d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center">
          <h1 className="header-logo" onClick={() => navigate("/home")}>
            ThreadHive
          </h1>
        </div>
        <div className="d-flex align-items-center">
          {token ? (
            <>
              <span className="user-name me-3">{user?.name || "User"}</span>
              <Button className="btn-header btn-primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className="btn-header btn-outline me-2"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button className="btn-header btn-primary" onClick={handleSignup}>
                Register
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
