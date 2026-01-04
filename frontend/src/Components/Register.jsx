import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Django serializer errors
        if (typeof data === "object") {
          const firstError = Object.values(data)[0];
          setError(Array.isArray(firstError) ? firstError[0] : "Registration failed");
        } else {
          setError("Registration failed");
        }
        return;
      }
      
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => {
      navigate("/login");
    }, 1500);
      // setFormData({
      //   username: "",
      //   email: "",
      //   password: "",
      //   password2: "",
      // });
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit} className="register-form ">
        
        <h4>Create a new account</h4>
         
         <div className="col-sm-50 ">
          
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={formData.password2}
          onChange={handleChange}
          required
        />
        <button className='btn btn-primary' type="submit">Register</button>
        </div>
        
      </form>
    </div>
  );
};

export default Register;
