package com.lospollostech.backend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LosRepository extends JpaRepository<LosEntity, Long>{
    List<LosEntity> findByReactantOneAndReactantTwoOrReactantOneAndReactantTwo(
    String reactantOne,
    String reactantTwo,
    String reactantTwoReverse,
    String reactantOneReverse
);
}
