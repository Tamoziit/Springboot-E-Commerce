package com.tamojit.backend.controller;

import com.tamojit.backend.model.Product;
import com.tamojit.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin //resolves CORS
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService service;

    @GetMapping
    public String greet() {
        return "Springboot E-Commerce Project";
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }
}
