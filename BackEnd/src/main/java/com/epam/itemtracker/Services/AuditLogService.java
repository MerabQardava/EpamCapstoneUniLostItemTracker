package com.epam.itemtracker.Services;

import com.epam.itemtracker.Controller.ReportController;
import com.epam.itemtracker.Entity.AuditLog;

import com.epam.itemtracker.Repositories.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private static final Logger logger = LoggerFactory.getLogger(AuditLogService.class);

    public void logAction(String action, String username) {
        logger.info("Audit initiated");
        AuditLog log = AuditLog.builder()
                .action(action)
                .username(username)
                .build();
        auditLogRepository.save(log);
    }
}