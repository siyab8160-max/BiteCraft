import { useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      localStorage.setItem("token", data.token);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Login to BiteCraft</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;