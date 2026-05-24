import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save username
      localStorage.setItem(
        "username",
        res.data.user.name
      );

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <div
        style={{
          width: "380px",
          padding: "35px",
          borderRadius: "20px",
          background: "#fff",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#333",
          }}
        >
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <FaEnvelope color="#764ba2" />
            
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                border: "none",
                outline: "none",
                marginLeft: "10px",
                width: "100%",
                fontSize: "15px",
              }}
            />
          </div>

          {/* Password */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <FaLock color="#764ba2" />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                border: "none",
                outline: "none",
                marginLeft: "10px",
                width: "100%",
                fontSize: "15px",
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: "#764ba2",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "#5a3d91")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "#764ba2")
            }
          >
            Login
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "#555",
          }}
        >
          Don’t have an account?{" "}
          <span
            style={{
              color: "#764ba2",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;