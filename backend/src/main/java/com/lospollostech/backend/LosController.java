package com.lospollostech.backend;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/los")
public class LosController {
    private final LosService losService;

    public LosController(LosService losService) {
        this.losService = losService;
    }

    @PostMapping("/add")
    public LosEntity add(@RequestBody LosEntity reaction){
        return losService.addReaction(reaction);
    }

    @GetMapping("/get")
    public List<LosEntity> getAll(){
        return losService.getReaction();
    }

    @GetMapping("/{id}")
    public LosEntity getElementById(@PathVariable Long id){
        return losService.getById(id);
    }
    
    @PutMapping("/update/{id}")
    public LosEntity update(@PathVariable Long id, @RequestBody LosEntity reaction){
        return losService.updateReaction(id,reaction);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        losService.deleteReaction(id);
    }

}
