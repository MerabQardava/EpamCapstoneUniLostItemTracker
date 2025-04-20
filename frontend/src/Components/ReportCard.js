import React from 'react';
import DirectImageComponent from './DirectImageComponent';

const ReportCard = ({ title, description, location, date, imageUrl }) => {
    return (
        <div className="max-w-sm border-2 m-3 border-indigo-700 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl bg-white transition duration-300 ease-in-out ">
            {imageUrl && (
                <DirectImageComponent
                    className="w-full h-52 object-cover rounded-t-3xl"
                    imageFileName={imageUrl}
                    alt="Reported item"
                />
            )}

            <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold text-indigo-700">{title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

                <div className="flex justify-center flex-wrap gap-2 text-xs font-medium text-gray-500">
          <span className="bg-gray-100 border-2 border-indigo-700 px-3 py-1 rounded-full">
            📍 {location}
          </span>
                    <span className="bg-gray-100 border-2 border-indigo-700 px-3 py-1 rounded-full">
            🕒 {new Date(date).toLocaleDateString()}
          </span>
                </div>
            </div>
        </div>
    );
};

export default ReportCard;
