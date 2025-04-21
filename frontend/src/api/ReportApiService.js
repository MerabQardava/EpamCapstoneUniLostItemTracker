import {apiClient} from "./ApiClient";

export const getAllReports=()=>{
    return apiClient.get(`/reports`)
}


export const uploadReport = async (formData) => {
    return apiClient.post(`/reports/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },

    });
};

