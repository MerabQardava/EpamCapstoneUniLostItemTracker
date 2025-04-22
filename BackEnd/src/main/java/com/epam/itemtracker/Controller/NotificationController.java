package com.epam.itemtracker.Controller;

import com.epam.itemtracker.DTOs.NotificationRequest;
import com.epam.itemtracker.Entity.Notification;
import com.epam.itemtracker.Services.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService){
        this.notificationService=notificationService;
    }

    @PostMapping("/add")
    public Notification addNotification(@RequestBody NotificationRequest request) {
        return notificationService.addNotification(request.getMessage(), request.getUserId());
    }

    @GetMapping("/{userId}")
    public List<Notification> getUserNotifications(@PathVariable Long userId){
        return notificationService.getNotificationsByUser(userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotification(@PathVariable Long id) {
        boolean deleted = notificationService.deleteNotification(id);
        if (deleted) {
            return ResponseEntity.ok("Report deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Report not found.");
        }
    }


}
