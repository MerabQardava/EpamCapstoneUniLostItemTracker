package com.epam.itemtracker.Services;

import com.epam.itemtracker.Entity.Notification;
import com.epam.itemtracker.Entity.User;
import com.epam.itemtracker.Repositories.NotificationRepository;
import com.epam.itemtracker.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository,UserRepository userRepository){
        this.notificationRepository=notificationRepository;
        this.userRepository=userRepository;
    }

    public List<Notification> getNotificationsByUser(Long userId) {
        return notificationRepository.findByUserId(userId);
    }



    public Notification addNotification(String message, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = Notification.builder()
                .message(message)
                .user(user)
                .build();

        return notificationRepository.save(notification);
    }


    public boolean deleteNotification(long id) {
        if (notificationRepository.existsById(id)) {
            notificationRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
