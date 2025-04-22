package com.epam.itemtracker.DTOs;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
public class NotificationRequest {
    private String message;
    private Long userId;
}