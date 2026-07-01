package com.lospollostech.backend;

import java.util.List;

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
    public List<LosEntity> getReaction(){
        return losRepo.findAll();
    }
    public LosEntity getById(Long id){
        return losRepo.findById(id).orElse(null);
    }
    public LosEntity updateReaction(Long id, LosEntity reaction) {
        LosEntity existingReaction = losRepo.findById(id).orElse(null);
        if (existingReaction != null) {
            existingReaction.setReactantOne(reaction.getReactantOne());
            existingReaction.setReactantTwo(reaction.getReactantTwo());
            existingReaction.setProduct(reaction.getProduct());
            existingReaction.setReactionType(reaction.getReactionType());
            existingReaction.setConditions(reaction.getConditions());
            existingReaction.setDescription(reaction.getDescription());

            return losRepo.save(existingReaction);
        }
        return null;
    }
    public void deleteReaction(Long id) {
        losRepo.deleteById(id);
    }
}
