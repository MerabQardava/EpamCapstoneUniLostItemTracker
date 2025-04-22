import React, { useState } from 'react';
import {getUserInfo, login} from "../api/AuthApiService";
import {useAuth} from "../api/AuthContext";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const context=useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await login(form);
            const info = await getUserInfo(res.data.username);
            context.saveUserInfo(info.data)

            context.login();
            console.log(context.userInfo);

            setMessage('✅ Login successful!');
            navigate("/");
        } catch (err) {
            console.error(err);

            setMessage(`❌ Login failed. Please check your credentials.`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm space-y-4">
                <h2 className="text-2xl font-bold text-indigo-600 text-center">Login</h2>

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

                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    Sign In
                </button>

                {message && <p className="text-center text-sm mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
