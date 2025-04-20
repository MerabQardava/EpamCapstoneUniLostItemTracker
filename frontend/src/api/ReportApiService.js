import {apiClient} from "./ApiClient";

export const getAllReports=()=>{
    return apiClient.get(`/reports`)
}

