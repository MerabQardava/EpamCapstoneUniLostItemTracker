import React, { useState } from 'react';

const ReportUploadPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        image: null,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value);
        });

        try {
            const res = await fetch('http://localhost:8080/reports/upload', {
                method: 'POST',
                body: payload,
            });

            if (res.ok) {
                setMessage('✅ Report submitted successfully!');
            } else {
                setMessage('❌ Failed to submit report.');
            }
        } catch (err) {
            console.error(err);
            setMessage('⚠️ Error submitting report.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Report a Lost Item</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
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
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
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
