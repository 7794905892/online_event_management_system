import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <>
      <nav className="nav">
        <div className="brand">⚡ Eventify</div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>

          {token && <li><Link to="/dashboard">My Bookings</Link></li>}
        </ul>

        <div className="right">
          {token ? (
            <>
              <span className="user">👋 {username}</span>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="login" to="/login">Login</Link>
              <Link className="signup" to="/register">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      {/* EMBEDDED CSS */}
      <style>{`
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;

          background: linear-gradient(135deg, #0f172a, #020617);
          border-bottom: 1px solid rgba(255,255,255,0.08);

          font-family: 'Segoe UI', sans-serif;
        }

        /* BRAND */
        .brand {
          font-size: 24px;
          font-weight: 900;
          color: #22c55e;
          letter-spacing: 1px;
        }

        /* CENTER LINKS */
        .nav-links {
          display: flex;
          gap: 25px;
          list-style: none;
        }

        .nav-links a {
          text-decoration: none;
          color: #cbd5e1;
          font-size: 15px;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 20px;
          transition: 0.3s;
        }

        .nav-links a:hover {
          background: #22c55e;
          color: #0f172a;
          transform: translateY(-2px);
        }

        /* RIGHT SIDE */
        .right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user {
          color: #94a3b8;
          font-size: 14px;
        }

        /* BUTTONS */
        .logout {
          background: linear-gradient(135deg, #ef4444, #b91c1c);
          border: none;
          padding: 8px 14px;
          color: white;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .logout:hover {
          transform: scale(1.05);
        }

        .login {
          color: #38bdf8;
          text-decoration: none;
          font-weight: 600;
          padding: 8px 12px;
        }

        .signup {
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          color: #0f172a;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 25px;
          font-weight: 700;
          transition: 0.3s;
        }

        .signup:hover {
          transform: scale(1.05);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav {
            flex-direction: column;
            gap: 10px;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;