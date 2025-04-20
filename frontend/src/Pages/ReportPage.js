import React, {useEffect, useState} from 'react';
import ReportCard from "../Components/ReportCard";
import {getAllReports} from "../api/ReportApiService";

function ReportPage(props) {
    const [reportList, setReportList] = useState(null)

    useEffect(() => {
        getAllReports().then((reports) => {
            setReportList(reports.data)
            console.log(reports.data[0])

        });
    }, []);
    return (
        <div className="flex flex-col items-center">
            {reportList && reportList.map((report, index) => (
                <ReportCard
                    key={index}
                    title={report.title}
                    description={report.description}
                    location={report.location}
                    date={report.createdAt}
                    imageUrl={report.imageUrl}
                />
            ))}
        </div>
    );
}

export default ReportPage;