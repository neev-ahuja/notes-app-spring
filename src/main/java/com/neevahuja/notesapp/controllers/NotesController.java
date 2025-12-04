package com.neevahuja.notesapp.controllers;

import com.neevahuja.notesapp.model.Notes;
import com.neevahuja.notesapp.requests.AddNoteRequest;
import com.neevahuja.notesapp.services.NotesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotesController {

    NotesService notesService;

    public NotesController(NotesService notesService){
        this.notesService = notesService;
    }

    @GetMapping("/api/notes")
    public List<Notes> getNotes(){
        return notesService.getNotes();
    }

    @PostMapping("/api/notes")
    public String addNote(@RequestBody AddNoteRequest addNoteRequest){
        return notesService.addNote(addNoteRequest.content , addNoteRequest.description , addNoteRequest.name);
    }

    @DeleteMapping("/api/notes/{name}")
    public String addNote(@PathVariable String name){
        return notesService.removeNote(name);
    }
}
