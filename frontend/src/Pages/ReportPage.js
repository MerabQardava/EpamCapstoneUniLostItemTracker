import React, {useEffect, useState} from 'react';
import ReportCard from "../Components/ReportCard";
import {getAllReports} from "../api/ReportApiService";

function ReportPage(props) {
    const [reportList, setReportList] = useState(null)

    useEffect(() => {
        getAllReports().then((reports) => {
            setReportList(reports.data)
            console.log(reports.data)

        });
    }, []);
    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-2 text-indigo-700">Reported Items</h1>
            {reportList && reportList.map((report, index) => (
                <ReportCard
                    id={report.id}
                    key={index}
                    title={report.title}
                    description={report.description}
                    location={report.location}
                    date={report.createdAt}
                    imageUrl={report.imageUrl}
                    status={report.status}
                    username={report.username}
                />
            ))}
        </div>
    );
}

export default ReportPage;