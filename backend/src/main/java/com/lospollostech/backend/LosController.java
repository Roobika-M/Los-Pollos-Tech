package com.lospollostech.backend;

import org.springframework.web.bind.annotation.PostMapping;
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
}
