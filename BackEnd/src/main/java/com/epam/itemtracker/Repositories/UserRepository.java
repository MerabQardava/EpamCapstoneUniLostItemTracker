package com.epam.itemtracker.Repositories;

import com.epam.itemtracker.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
