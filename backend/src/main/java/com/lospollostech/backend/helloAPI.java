package com.lospollostech.backend;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class helloAPI {

    @GetMapping("/api")
    String hello(){
        return "first api creation";
    }
}
