package com.epam.itemtracker.Services;

import com.epam.itemtracker.Entity.User;
import com.epam.itemtracker.Repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User addUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }

    public User getUserByName(String name){
        return userRepository.findByUsername(name);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }


}
