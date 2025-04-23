package com.epam.itemtracker.Repositories;

import com.epam.itemtracker.Entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
