package com.epam.itemtracker.Controller;

import com.epam.itemtracker.DTOs.UserDTO;
import com.epam.itemtracker.Entity.LoginRequest;
import com.epam.itemtracker.Entity.User;
import com.epam.itemtracker.Services.AuditLogService;
import com.epam.itemtracker.Services.UserService;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;
    private final AuditLogService auditLogService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    public UserController(UserService userService,AuditLogService auditLogService){
        this.userService=userService;
        this.auditLogService=auditLogService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> newUser(@RequestBody() User user){
        User newUser = userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PostMapping("/userinfo")
    public ResponseEntity<UserDTO> getUserInfo(@RequestBody String username) {
        User user = userService.getUserByName(username);
        if (user != null) {
            UserDTO dto = new UserDTO(
                    user.getId(),
                    user.getUsername(),
                    user.getFullName(),
                    user.getEmail(),
                    user.getRole().toString()
            );
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

            if (isAuthenticated) {
                User user = userService.getUserByName(loginRequest.getUsername());
                if (user != null) {
                    session.setAttribute("user", user);

                    UserDTO userDTO = new UserDTO(
                            user.getId(),
                            user.getUsername(),
                            user.getFullName(),
                            user.getEmail(),
                            user.getRole().toString()
                    );

                    return ResponseEntity.ok(userDTO);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error occurred");
        }
    }




//    @GetMapping
//    public List<User> getAllUsers(){
//        return userService.getAllUsers();
//    }
}
