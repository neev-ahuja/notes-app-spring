package com.neevahuja.notesapp.services;

import com.neevahuja.notesapp.requests.RegisterRequest;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    AuthenticationManager authenticationManager;
    JWTService jwtService;
    UserService userService;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    @Autowired
    public AuthService(AuthenticationManager authenticationManager , JWTService jwtService , UserService userService){
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    public String login(String username , String password) {
        try{

            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            password
                    );

            Authentication auth = authenticationManager.authenticate(token);

            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (Exception e){
            return "FAILED TO LOGIN " + e.getMessage();
        }

        return jwtService.generateToken(username);
    }

    public String register(RegisterRequest registerRequest) {
        return userService.addUser(registerRequest.username , passwordEncoder.encode(registerRequest.password) , registerRequest.name);
    }
}
