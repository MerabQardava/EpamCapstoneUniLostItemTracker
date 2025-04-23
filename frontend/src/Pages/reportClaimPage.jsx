import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";
const ReportClaimPage = () => {
    const { status } = useParams();

    let message = 'Your report has been submitted successfully.';

    if (status?.toUpperCase() === 'FOUND') {
        message = 'The item has been claimed and user notified.';
    } else if (status?.toUpperCase() === 'LOST') {
        message = 'Thank you for reporting the item, user has been notified';
    }else if (status?.toUpperCase() === 'DELETE') {
        message = 'Your report has been deleted successfully.';
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg text-center">
                <div className="text-green-500 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirmation</h2>
                <p className="text-lg text-gray-600 mb-6">{message}</p>
                <Button as={Link} to={"/"}
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
                >
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default ReportClaimPage;