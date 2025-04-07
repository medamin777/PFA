// src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import '../index.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'doctor',
    address: '',
    profilePicture: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        if (key !== 'confirmPassword') {
          formDataToSend.append(key, formData[key]);
        }
      }

      await register(formDataToSend);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-yellow-600">Create your account</h2>
        </div>

        {error && <div className="text-red-500 text-center font-medium bg-red-100 p-2 rounded">{error}</div>}
        {success && <div className="text-green-500 text-center font-medium bg-green-100 p-2 rounded">{success}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
           

            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="First Name"
              className="input-field"
              value={formData.firstName}
              onChange={handleChange}
            />

            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              placeholder="Last Name"
              className="input-field"
              value={formData.lastName}
              onChange={handleChange}
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm Password"
              className="input-field"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <input
              id="address"
              name="address"
              type="text"
              required
              placeholder="Address"
              className="input-field"
              value={formData.address}
              onChange={handleChange}
            />

            <select
              id="role"
              name="role"
              required
              className="input-field"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
            <div className="relative flex flex-col items-center space-y-3">
 

                <label className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                    Upload Image
                    <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
               </label>

               {formData.profilePicture && (
               <div className="mt-2 relative">
             <img
               src={URL.createObjectURL(formData.profilePicture)}
                alt="Preview"
               className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
      />
           </div>
             )}
          </div>

          </div>

          <button type="submit" className="btn-yellow">
            Sign up
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-600 font-semibold hover:text-yellow-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;