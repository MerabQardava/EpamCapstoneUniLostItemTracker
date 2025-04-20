package com.epam.itemtracker.Repositories;

import com.epam.itemtracker.Entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report,Long>{
}
