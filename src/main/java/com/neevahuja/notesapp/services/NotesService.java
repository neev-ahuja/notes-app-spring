package com.neevahuja.notesapp.services;

import com.neevahuja.notesapp.model.Notes;
import com.neevahuja.notesapp.model.Users;
import com.neevahuja.notesapp.repositeries.UserRepo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotesService {

    UserRepo userRepo;

    public NotesService(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    public String addNote(String content , String description , String name){
        Users user = userRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        user.addNote(name , description , content);
        userRepo.save(user);
        return "SUCESS";
    }

    public String removeNote(String name){
        Users user = userRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        user.removeNote(name);
        userRepo.save(user);
        return "SUCESS";
    }

    public List<Notes> getNotes() {
        Users user = userRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        return user.returnNotes();
    }
}
