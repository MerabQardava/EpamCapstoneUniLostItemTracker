import React, { useState } from 'react';
import {uploadReport} from "../api/ReportApiService";
import {useAuth} from "../api/AuthContext";
import {useNavigate} from "react-router-dom";

const ReportUploadPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        status: 'FOUND',
        image: null,
    });

    const context = useAuth();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!context.userInfo || !context.userInfo.username) {
            setMessage("⚠️ User info not loaded. Please try again.");
            return;
        }

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value);
        });

        payload.append('user', context.userInfo.id);

        try {
            await uploadReport(payload);
            setMessage('✅ Report submitted successfully!');
            if(formData.status === 'FOUND') {
                navigate('/report/confirmation/found');
            }else if(formData.status === 'LOST') {
                navigate('/report/confirmation/lost');
            }

        } catch (err) {
            console.error(err);
            setMessage('❌ Failed to submit report.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Report an Item</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Item Status</label>
                        <div className="flex mt-3 justify-center space-x-8">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="lost"
                                    name="status"
                                    value="LOST"
                                    checked={formData.status === 'LOST'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="lost" className="ml-2 block text-sm text-gray-700">Lost</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="found"
                                    name="status"
                                    value="FOUND"
                                    checked={formData.status === 'FOUND'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="found" className="ml-2 block text-sm text-gray-700">Found</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-0.5 rounded-lg border-2 border-indigo-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="mt-1 w-full p-0.5 rounded-lg border-2 border-indigo-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-0.5 rounded-lg border-2 border-indigo-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            required
                            className="mt-1"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
                    >
                        Submit Report
                    </button>
                </form>
                {message && (
                    <div className="mt-4 text-center text-sm text-gray-700">{message}</div>
                )}
            </div>
        </div>
    );
};

export default ReportUploadPage;