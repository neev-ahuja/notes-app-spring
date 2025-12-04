package com.neevahuja.notesapp.controllers;

import com.neevahuja.notesapp.model.Users;
import com.neevahuja.notesapp.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/api/user")
    public Users getUser(){
        return userService.getUser();
    }
}
