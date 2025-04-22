import {apiClient} from "./ApiClient";


export const fetchNotifications = async (id) => {
    const res = await apiClient.get("notification/"+id);
    return res.data;
};

export const deleteNotification = async (id) => {
    await apiClient.delete(`notification/${id}`);
};

export const addNotification = (notificationData) => {
    return apiClient.post('/notification/add', {
        message:notificationData.message,
        userId:notificationData.userId,
    });
};
