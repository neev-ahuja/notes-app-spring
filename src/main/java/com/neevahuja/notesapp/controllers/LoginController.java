package com.neevahuja.notesapp.controllers;

import com.neevahuja.notesapp.requests.LoginRequest;
import com.neevahuja.notesapp.requests.RegisterRequest;
import com.neevahuja.notesapp.services.AuthService;
import com.neevahuja.notesapp.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    AuthService authService;

    @Autowired
    public LoginController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/api/login")
    public String login(@RequestBody LoginRequest loginRequest){
        return authService.login(loginRequest.username , loginRequest.password);
    }

    @PostMapping("/api/register")
    public String register(@RequestBody RegisterRequest registerRequest){
        return authService.register(registerRequest);
    }

    @GetMapping("/test")
    public String test(){
        return "WORKING";
    }
}
