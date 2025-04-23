import {apiClient} from "./ApiClient";

export const getAllReports=()=>{
    return apiClient.get(`/reports`)
}

export const deleteReports=(id)=>{
    return apiClient.delete(`/reports/`+id)
}


export const uploadReport = async (formData) => {
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    return apiClient.post(`/reports/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },

    });


};

export const updateReport = (id, updatedReport) => {
    return apiClient.put(`/reports/${id}`, updatedReport);
};

