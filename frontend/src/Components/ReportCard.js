import React, { useState } from 'react';
import DirectImageComponent from './DirectImageComponent';
import { useNavigate } from 'react-router-dom';
import { deleteReports } from "../api/ReportApiService";
import { addNotification } from "../api/NotificationApiService";
import { useAuth } from "../api/AuthContext";
import EditReportModal from './EditReportModal';

const ReportCard = ({ id, title, description, location, date, imageUrl, status, username, userId }) => {
    const isFound = status === 'FOUND';
    const navigate = useNavigate();
    const context = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);

    const onClaim = () => {
        if (isFound) {
            navigate("/report/claim/found");
            addNotification({
                message: `${context.userInfo.username} has claimed the ${title}`,
                userId: userId,
            });
        } else {
            navigate("/report/claim/lost");
            addNotification({
                message: `${context.userInfo.username} has found the ${title}`,
                userId: userId,
            });
        }
        deleteReports(id).then(console.log).catch(console.log);
    };

    const onDelete = () => {
        navigate("/report/claim/delete");
        deleteReports(id);
    };

    const handleUpdated = () => {
        window.location.reload(); // Refresh after edit
    };

    return (
        <>
            <div className="max-w-sm w-full border-2 m-3 border-indigo-700 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl bg-white transition duration-300 ease-in-out">
                {imageUrl && (
                    <DirectImageComponent
                        className="w-full h-52 object-cover rounded-t-3xl"
                        imageFileName={imageUrl}
                        alt="Reported item"
                    />
                )}

                <div className="p-5 pt-2 pb-4 space-y-3">
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-indigo-700 break-words whitespace-pre-wrap line-clamp-3">
                            {title}
                        </h2>
                        <div className="mt-1">
                            <span
                                className={`text-xs font-bold px-2 py-1 rounded-full ${
                                    isFound
                                        ? 'bg-green-100 text-green-700 border border-green-500'
                                        : 'bg-yellow-100 text-yellow-700 border border-yellow-500'
                                }`}
                            >
                                {status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-3 break-words whitespace-pre-wrap">
                            {username} {isFound ? 'has found' : 'has lost'} the item
                        </p>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed text-center break-words whitespace-pre-wrap max-h-28 overflow-y-auto">
                        {description}
                    </p>

                    <div className="flex justify-center flex-wrap gap-2 text-xs font-medium text-gray-500">
                        <div className="flex-grow-0 max-w-full">
                            <span className="inline-block bg-gray-100 border-2 border-indigo-700 px-3 py-1 rounded-full truncate max-w-full" title={location}>
                                📍 {location.length > 30 ? `${location.substring(0, 27)}...` : location}
                            </span>
                        </div>
                        <span className="bg-gray-100 border-2 border-indigo-700 px-3 py-1 rounded-full shrink-0">
                            🕒 {new Date(date).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="pt-2 text-center space-x-2">
                        {username === context.userInfo.username ? (
                            <>
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="px-4 py-2 rounded-full font-semibold text-sm shadow-sm bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={onDelete}
                                    className="px-4 py-2 rounded-full font-semibold text-sm shadow-sm bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onClaim}
                                className={`px-4 py-2 rounded-full font-semibold text-sm shadow-sm ${
                                    isFound
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                }`}
                            >
                                {isFound ? 'Claim' : 'Report Item'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <EditReportModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                report={{ id, title, description, location, status }}
                onUpdated={handleUpdated}
            />
        </>
    );
};

export default ReportCard;
