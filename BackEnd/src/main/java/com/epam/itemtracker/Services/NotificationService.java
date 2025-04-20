package com.epam.itemtracker.Services;

import com.epam.itemtracker.Entity.Notification;
import com.epam.itemtracker.Repositories.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository=notificationRepository;
    }

    public List<Notification> getNotificationsByUser(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification addNotification(Notification notification){
        return notificationRepository.save(notification);
    }


}
