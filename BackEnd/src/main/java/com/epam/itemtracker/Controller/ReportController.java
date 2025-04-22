package com.epam.itemtracker.Controller;

import com.epam.itemtracker.DTOs.ReportDTO;
import com.epam.itemtracker.Entity.Enums.ReportStatus;
import com.epam.itemtracker.Entity.Report;
import com.epam.itemtracker.Services.ReportService;
import com.epam.itemtracker.Services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);
    private final ReportService reportService;
    private final UserService userService;

    public ReportController(ReportService reportService,UserService userService) {
        this.reportService = reportService;
        this.userService=userService;
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteReport(@PathVariable long id) {
        boolean deleted = reportService.deleteReport(id);
        logger.info("Deletion has been initiated");
        if (deleted) {
            return ResponseEntity.ok("Report deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Report not found.");
        }
    }

    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<Report> uploadReport(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile imageFile,
            @RequestParam("location") String location,
            @RequestParam("user") Long userId,
            @RequestParam("status") String status
    ) {
        try {
            String uploadDir = "uploads/";
            String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, imageFile.getBytes());

            String imageUrl = fileName;

            logger.error(String.valueOf(userId));


            var optionalUser = userService.getUserById(userId);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Report report = new Report();
            report.setTitle(title);
            report.setDescription(description);
            report.setImageUrl(imageUrl);
            report.setLocation(location);
            report.setUser(optionalUser.get());
            report.setStatus(ReportStatus.valueOf(status));

            Report saved = reportService.saveReport(report);

            return ResponseEntity.ok(saved);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public List<ReportDTO> getAllReports() {
        List<Report> reports = reportService.getAllReports();

        if (!reports.isEmpty()) {
            logger.info("Retrieved report: {}", reports.get(0).getTitle());
        }
        if (reports.size() > 1) {
            logger.info("Retrieved report: {}", reports.get(1).getTitle());
        }

        return reports.stream()
                .map(ReportDTO::new)
                .toList();
    }

}