package com.lospollostech.backend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LosRepository extends JpaRepository<LosEntity, Long>{
    @Query("""
        select l
        from LosEntity l
        where (
            lower(l.reactantOne) = lower(:reactantOne)
            and lower(l.reactantTwo) = lower(:reactantTwo)
        ) or (
            lower(l.reactantOne) = lower(:reactantTwo)
            and lower(l.reactantTwo) = lower(:reactantOne)
        )
    """)
    List<LosEntity> findByReactantOneAndReactantTwoOrReactantOneAndReactantTwo(
        @Param("reactantOne") String reactantOne,
        @Param("reactantTwo") String reactantTwo
    );
}
