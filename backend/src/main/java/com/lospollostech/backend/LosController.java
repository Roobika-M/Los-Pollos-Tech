package com.lospollostech.backend;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/los")
public class LosController {
    private final LosService losService;

    public LosController(LosService losService) {
        this.losService = losService;
    }

    @PostMapping("/add") //used to add reactios in jpa
    public LosEntity add(@Valid @RequestBody LosEntity reaction){
        return losService.addReaction(reaction);
    }

    @GetMapping("/get") //getReaction
    public List<LosEntity> getAll(){
        return losService.getReaction();
    }

    @GetMapping("/get/{id}") //getElements by id
    public LosEntity getElementById(@PathVariable Long id){
        return losService.getById(id);
    }
    
    @PutMapping("/update/{id}") //used to update id
    public LosEntity update(@PathVariable Long id, @Valid @RequestBody LosEntity reaction){
        return losService.updateReaction(id,reaction);
    }

    @DeleteMapping("/delete/{id}") //delete id from jps
    public void delete(@PathVariable Long id){
        losService.deleteReaction(id);
    }

    @GetMapping("/mix") //mixitiy mix
    public ResponseEntity<List<LosEntity>> mix(@RequestParam String reactantOne,@RequestParam String reactantTwo) {
        List<LosEntity> reactions = losService.mix(reactantOne, reactantTwo);
        if (reactions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reactions);
    }
}