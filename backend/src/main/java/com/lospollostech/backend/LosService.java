package com.lospollostech.backend;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;

@Service
public class LosService {

    private final LosRepository losRepo;

    public LosService(LosRepository losRepo){
        this.losRepo = losRepo;
    }
    public LosEntity addReaction(LosEntity reaction){
        if (!losRepo.findByReactantOneAndReactantTwoOrReactantOneAndReactantTwo(
                reaction.getReactantOne(),
                reaction.getReactantTwo()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Reaction already exists");
        }
        return losRepo.save(reaction);
    }
    public List<LosEntity> getReaction(){
        return losRepo.findAll();
    }
    public LosEntity getById(Long id){
        return losRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reaction not found"));
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

    public List<LosEntity> mix(String reactantOne, String reactantTwo){
        return losRepo.findByReactantOneAndReactantTwoOrReactantOneAndReactantTwo(
            reactantOne,
            reactantTwo
        );
    }
}
