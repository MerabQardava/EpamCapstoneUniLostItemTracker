package com.epam.itemtracker.Controller;

import com.epam.itemtracker.Entity.User;
import com.epam.itemtracker.Services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> newUser(@RequestBody() User user){
        User newUser = userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
//        try{
//            boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(),loginRequest.getPassword());
//
//            if (isAuthenticated){
//                session.setAttribute("user", loginRequest.getUsername());
//                return ResponseEntity.ok("Login was successful!");
//            } else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error occurred");
//        }
//    }




//    @GetMapping
//    public List<User> getAllUsers(){
//        return userService.getAllUsers();
//    }
}
