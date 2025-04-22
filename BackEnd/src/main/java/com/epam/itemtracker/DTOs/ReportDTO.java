package com.epam.itemtracker.DTOs;

import com.epam.itemtracker.Entity.Report;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
public class ReportDTO {
    private Long id;
    private String title;
    private String description;
    private String location;
    private String imageUrl;
    private String status;
    private String createdAt;
    private String username;

    public ReportDTO(Report report) {
        this.id = report.getId();
        this.title = report.getTitle();
        this.description = report.getDescription();
        this.location = report.getLocation();
        this.imageUrl = report.getImageUrl();
        this.status = report.getStatus().toString();
        this.createdAt = report.getCreatedAt().toString();
        this.username = report.getUser().getUsername();
    }
}
