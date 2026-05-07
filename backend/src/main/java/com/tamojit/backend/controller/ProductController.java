package com.tamojit.backend.controller;

import com.tamojit.backend.model.Product;
import com.tamojit.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK); // custom HTTP status code (here = 200) [proper HTTP response]
    }

    @GetMapping("/products/{prodId}")
    public ResponseEntity<Product> getProductById(@PathVariable("prodId") int prodId) {
        Product product = service.getProductById(prodId);

        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Status 404
        }
    }
}
