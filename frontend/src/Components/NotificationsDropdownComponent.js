import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fetchNotifications, deleteNotification as deleteNotificationAPI } from "../api/NotificationApiService";
import { useAuth } from "../api/AuthContext";

export default function NotificationsDropdownComponent({ isLoggedIn }) {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const { userInfo } = useAuth();

    useEffect(() => {
        let interval;
        if (isLoggedIn && userInfo?.id) {
            const fetchAndUpdate = async () => {
                const updated = await fetchNotifications(userInfo.id);
                setNotifications(updated);
            };

            fetchAndUpdate();

            interval = setInterval(fetchAndUpdate, 5000);
        }

        return () => clearInterval(interval);
    }, [isLoggedIn, userInfo]);

    const handleDelete = async (id) => {
        await deleteNotificationAPI(id);
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    if (!isLoggedIn) return null;

    return (
        <div className="relative flex items-center justify-center">
            <button onClick={() => setOpen(!open)} className="relative">
                <Bell className="w-6 h-6" />
                {notifications.some(n => !n.read) && (
                    <span className="absolute top-5 right-0 w-2 h-2 bg-red-500 rounded-full" />
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-auto bg-white shadow-lg rounded-lg p-4 z-50">
                    {notifications.length === 0 ? (
                        <div className="text-sm text-gray-500">No notifications</div>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`flex items-start justify-between mb-3 border-b pb-2 ${
                                    !n.read ? "font-semibold" : "text-gray-600"
                                }`}
                            >
                                <div>
                                    <div>{n.message}</div>
                                    <div className="text-xs text-gray-400">
                                        {formatDistanceToNow(new Date(n.createdAt), {
                                            addSuffix: true,
                                        })}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(n.id)}
                                    className="text-gray-400 hover:text-red-500"
                                    title="Delete"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );



}
