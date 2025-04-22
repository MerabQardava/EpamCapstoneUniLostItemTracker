import React from 'react';
import DirectImageComponent from './DirectImageComponent';
import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {deleteReports} from "../api/ReportApiService";
import {addNotification} from "../api/NotificationApiService";
import {useAuth} from "../api/AuthContext";

const ReportCard = ({id, title, description, location, date, imageUrl, status, username }) => {
    const isFound = status === 'FOUND';
    const navigate = useNavigate();
    const context = useAuth();

    const onClaim=()=>{
        if(isFound){
            navigate("/report/claim/found")
            addNotification({
                message:`${context.userInfo.username} has claimed the ${title}`,
                userId:context.userInfo.id,
            })
        }else{
            navigate("/report/claim/lost")
            addNotification({
                message:`${context.userinfo.username} has found the ${title}`,
                userId:context.userinfo.id,
            })
        }
        deleteReports(id).then((e)=>console.log(e)).catch((e)=>console.log(e));
    }

    return (
        <div className="max-w-sm border-2 m-3 border-indigo-700 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl bg-white transition duration-300 ease-in-out">
            {imageUrl && (
                <DirectImageComponent
                    className="w-full h-52 object-cover rounded-t-3xl"
                    imageFileName={imageUrl}
                    alt="Reported item"
                />
            )}

            <div className="p-5 pt-2 pb-4 space-y-3">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-indigo-700">{title}</h2>
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
                    <p className="text-sm  text-gray-600 mt-3">
                        {username} {isFound ? 'has found' : 'has lost'} the item
                    </p>
                </div>

                <p className="text-gray-600  text-sm leading-relaxed">{description}</p>

                <div className="flex justify-center flex-wrap gap-2 text-xs font-medium text-gray-500">
                    <span className="bg-gray-100 border-2 border-indigo-700 px-3 py-1 rounded-full">
                        📍 {location}
                    </span>
                    <span className="bg-gray-100 border-2 border-indigo-700 px-3 py-1 rounded-full">
                        🕒 {new Date(date).toLocaleDateString()}
                    </span>
                </div>

                <div className="pt-2 text-center">
                    <button as={Link} onClick={onClaim}
                            className={`mt-2 px-4 py-2 rounded-full font-semibold text-sm shadow-sm ${
                            isFound
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                        }`}
                    >
                        {isFound ? 'Claim' : 'Report Item'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportCard;
