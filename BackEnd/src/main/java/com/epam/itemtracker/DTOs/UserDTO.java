package com.epam.itemtracker.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
public class UserDTO {
    private Long id;
    private String username;
    private String fullName;
    private String email;
    private String role;
}