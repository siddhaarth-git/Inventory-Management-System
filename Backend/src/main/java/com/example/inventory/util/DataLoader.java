package com.example.inventory.util;

import com.example.inventory.entity.Product;
import com.example.inventory.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            productRepository.save(new Product(null, "Laptop", "Electronics", 75000.0, 10));
            productRepository.save(new Product(null, "Mouse", "Electronics", 500.0, 100));
            productRepository.save(new Product(null, "Desk Chair", "Furniture", 4500.0, 25));
        }
    }
}
