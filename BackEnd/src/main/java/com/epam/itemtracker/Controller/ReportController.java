package com.epam.itemtracker.Controller;

import com.epam.itemtracker.Entity.Report;
import com.epam.itemtracker.Services.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<Report> uploadReport(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile imageFile,
            @RequestParam("location") String location
    ) {
        try {
            String uploadDir = "uploads/";
            String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, imageFile.getBytes());


            String imageUrl = fileName;


            Report report = new Report();
            report.setTitle(title);
            report.setDescription(description);
            report.setImageUrl(imageUrl);
            report.setLocation(location);
            Report saved = reportService.saveReport(report);

            return ResponseEntity.ok(saved);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }
}