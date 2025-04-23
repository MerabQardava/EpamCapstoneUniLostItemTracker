import React, { useState } from 'react';
import {register} from "../api/AuthApiService";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMessage('❌ Passwords do not match');
            return;
        }

        const payload = {
            username: form.username,
            email: form.email,
            password: form.password,
            fullName: '',
        };

        try {
            await register(payload);
            setMessage('✅ Registration successful! You can now log in.');
            setForm({ username: '', email: '', password: '', confirmPassword: '' });
            navigate("/register/confirmation");

        } catch (err) {
            console.error(err);
            setMessage(`❌ ${err.response?.data?.message || 'Registration failed'}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-indigo-600 text-center">Register</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    Sign Up
                </button>

                {message && <p className="text-center text-sm mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default RegisterPage;
