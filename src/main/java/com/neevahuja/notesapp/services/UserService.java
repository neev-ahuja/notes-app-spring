package com.neevahuja.notesapp.services;

import com.neevahuja.notesapp.model.Users;
import com.neevahuja.notesapp.repositeries.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public String addUser(String username, String password, String name) {
        Users existingUser = userRepo.findByUsername(username);

        if (existingUser != null) {
            return "ERROR: Username already exists" ;
        }

        Users user = new Users(name, password, username);
        userRepo.save(user);

        return "SUCCESS";
    }

    public Users getUser() {
        return userRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
