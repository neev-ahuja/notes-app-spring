package com.neevahuja.notesapp.repositeries;

import com.neevahuja.notesapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepo extends JpaRepository<Users , Integer> {

    Users findByUsername(String username);
}
