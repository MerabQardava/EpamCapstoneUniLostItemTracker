package com.epam.itemtracker.Controller;

import com.epam.itemtracker.Entity.Notification;
import com.epam.itemtracker.Services.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService){
        this.notificationService=notificationService;
    }

    @PostMapping
    public Notification addUser(@RequestBody Notification notification){
        return notificationService.addNotification(notification);
    }

    @GetMapping("/{userId}")
    public List<Notification> getUserNotifications(@PathVariable Long userId){
        return notificationService.getNotificationsByUser(userId);
    }


}
