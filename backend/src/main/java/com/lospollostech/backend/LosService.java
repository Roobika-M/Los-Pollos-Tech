package com.lospollostech.backend;

import org.springframework.stereotype.Service;

@Service
public class LosService {

    private final LosRepository losRepo;

    public LosService(LosRepository losRepo){
        this.losRepo = losRepo;
    }
    public LosEntity addReaction(LosEntity reaction){
        return losRepo.save(reaction);
    }
}
