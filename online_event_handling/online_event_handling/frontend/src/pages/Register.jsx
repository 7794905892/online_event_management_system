import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
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

      const res = await API.post(
        "/auth/register",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {

      alert(error.response.data.message);
    }
  };

  return (

    <div className="form-container">

      <h2>Register</h2>

      <form
        className="form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>

      </form>

      {/* Login Link */}
      <p
        style={{
          marginTop: "15px",
          textAlign: "center",
        }}
      >
        Already have an account?{" "}
        
        <Link
          to="/login"
          style={{
            color: "#764ba2",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Login
        </Link>

      </p>

    </div>
  );
}

export default Register;