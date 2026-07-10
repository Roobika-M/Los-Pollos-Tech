package com.lospollostech.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class LosEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String reactantOne;

    @NotBlank
    private String reactantTwo;

    @NotBlank
    private String product;

    @NotBlank
    private String reactionType;

    @NotBlank
    private String conditions;

    @NotBlank
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