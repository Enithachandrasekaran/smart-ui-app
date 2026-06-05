import "./Registration.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Backend API – port must match server (.env PORT=5001) */
const API_BASE =
  (import.meta.env.VITE_API_URL && String(import.meta.env.VITE_API_URL).startsWith("http"))
    ? String(import.meta.env.VITE_API_URL).replace(/\/$/, "")
    : "http://localhost:5001";
const REGISTER_URL = `${API_BASE}/register`;

/* City Data */
const stateCities = {
  "tamil-nadu": ["Chennai","Coimbatore","Madurai","Salem","Erode"],
  kerala: ["Kochi","Kollam","Kannur"],
  karnataka: ["Bangalore","Mysore","Mangalore"]
};

const Registration = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    preferredLanguage: "",
    agreeToTerms: false,
    file: null
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* Handle Input Change */
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "state") {
      setFormData({ ...formData, state: value, city: "" });
    }
  };

  const getCities = () => stateCities[formData.state] || [];

  const handleLoginClick = () => {
    if (onSwitchToLogin) {
      onSwitchToLogin();
      return;
    }

    navigate("/login");
  };

  /* Submit Form */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.email || !formData.password) {
      setError("Please fill required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please accept Terms");
      return;
    }

    try {
      const form = new FormData();

      Object.keys(formData).forEach(key => {
        if (key !== "file") form.append(key, formData[key]);
      });

      if (formData.file) {
        form.append("file", formData.file);
      }

      const response = await fetch(REGISTER_URL, {
        method: "POST",
        body: form
      });

      const data = await response.json().catch(() => ({ message: "Invalid response" }));

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("✅ Registered Successfully – data saved to MongoDB");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        state: "",
        city: "",
        zipCode: "",
        preferredLanguage: "",
        agreeToTerms: false,
        file: null
      });

      if (onSwitchToLogin) onSwitchToLogin();

    } catch (err) {
      console.error(err);
      setError("Backend is not running. Open a terminal in the project folder, run: npm run start — then try again.");
    }
  };

  return (
    <main className="registration-page">
      <section className="registration-card">
        <div className="registration-header">
          <p className="registration-kicker">Create Account</p>
          <h1>Register</h1>
          <p>Join RedStream and manage your blood donation requests easily.</p>
        </div>

      {error && <p className="error">{error}</p>}

      <form className="registration-form" onSubmit={handleSubmit}>

        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange}/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input name="phone" value={formData.phone} onChange={handleChange}/>
          </div>
        </div>

        <div className="form-group">
          <label>Date of Birth *</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>State *</label>
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            <option value="tamil-nadu">Tamil Nadu</option>
            <option value="kerala">Kerala</option>
            <option value="karnataka">Karnataka</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City *</label>
            <select name="city" value={formData.city} onChange={handleChange}>
              <option>Select City</option>
              {getCities().map(city => <option key={city}>{city}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Zip Code *</label>
            <input name="zipCode" value={formData.zipCode} onChange={handleChange}/>
          </div>
        </div>

        <div className="form-group">
          <label>Password *</label>
          <div className="password-input-wrapper">
            <input type={showPassword ? "text" : "password"} name="password"
              value={formData.password} onChange={handleChange}/>
            <button type="button" className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}>Show</button>
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password *</label>
          <div className="password-input-wrapper">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
              value={formData.confirmPassword} onChange={handleChange}/>
            <button type="button" className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>Show</button>
          </div>
        </div>

        <div className="form-group">
          <label>Upload File</label>
          <div className="file-upload-wrapper">
            <input type="file" name="file" onChange={handleChange} className="file-input"/>
            <label className="file-label">
              {formData.file ? formData.file.name : "Choose File"}
            </label>
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" name="agreeToTerms"
              checked={formData.agreeToTerms} onChange={handleChange}/>
            I agree to Terms
          </label>
        </div>

        <button type="submit" className="registration-submit-btn">REGISTER</button>

        <p className="registration-login-link">
          Already have an account?{" "}
          <button type="button" onClick={handleLoginClick}>
            Login
          </button>
        </p>

        <p className="backend-link">
          Backend (MongoDB): <a href={API_BASE} target="_blank" rel="noopener noreferrer">{API_BASE}</a>
          <br />
          <small>Start with: npm run server</small>
        </p>
      </form>
      </section>
    </main>
  );
};

export default Registration;
