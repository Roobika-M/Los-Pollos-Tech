package com.lospollostech.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LosEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reactantOne;
    private String reactantTwo;
    private String product;
    private String reactionType;
    private String conditions;
    private String description;

    public LosEntity(){

    }
    public void setId(Long id){
        this.id = id;
    }
    public Long getId(){
        return id;
    }

    public String getReactantOne() {
        return reactantOne;
    }
    public void setReactantOne(String reactantOne) {
        this.reactantOne = reactantOne;
    }

    public String getReactantTwo() {
        return reactantTwo;
    }
    public void setReactantTwo(String reactantTwo) {
        this.reactantTwo = reactantTwo;
    }

    public String getProduct() {
        return product;
    }
    public void setProduct(String product) {
        this.product = product;
    }

    public String getReactionType() {
        return reactionType;
    }
    public void setReactionType(String reactionType) {
        this.reactionType = reactionType;
    }

    public String getConditions() {
        return conditions;
    }
    public void setConditions(String conditions) {
        this.conditions = conditions;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}