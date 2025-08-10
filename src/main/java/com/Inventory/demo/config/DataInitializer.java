package com.Inventory.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.Inventory.demo.entity.Product;
import com.Inventory.demo.entity.User;
import com.Inventory.demo.repository.ProductRepository;
import com.Inventory.demo.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeUsers();
        initializeSampleProducts();
    }

    private void initializeUsers() {
        if (userRepository.count() == 0) {
            logger.info("Initializing default users...");
            
            // Create admin user
            User admin = new User("admin", "admin123", "admin@imspro.com", "ADMIN", "System Administrator");
            userRepository.save(admin);
            
            // Create regular user
            User user = new User("user", "user123", "user@imspro.com", "USER", "Regular User");
            userRepository.save(user);
            
            logger.info("Default users created successfully");
        }
    }

    private void initializeSampleProducts() {
        if (productRepository.count() == 0) {
            logger.info("Initializing sample products...");
            
            // Sample Electronics
            Product laptop = new Product("Dell XPS 13 Laptop", "13-inch premium laptop with Intel i7 processor", 
                "Electronics", 1299.99, 15, "LAP-DELL-XPS13", "Dell Inc.", "Warehouse A - Shelf 1");
            productRepository.save(laptop);
            
            Product smartphone = new Product("iPhone 15 Pro", "Latest iPhone with A17 Pro chip", 
                "Electronics", 999.99, 25, "PHONE-IPHONE15PRO", "Apple Inc.", "Warehouse A - Shelf 2");
            productRepository.save(smartphone);
            
            // Sample Clothing
            Product tshirt = new Product("Cotton T-Shirt", "Comfortable 100% cotton t-shirt", 
                "Clothing", 19.99, 50, "CLOTH-TSHIRT-COTTON", "Fashion Co.", "Warehouse B - Shelf 1");
            productRepository.save(tshirt);
            
            Product jeans = new Product("Blue Jeans", "Classic blue denim jeans", 
                "Clothing", 49.99, 30, "CLOTH-JEANS-BLUE", "Denim World", "Warehouse B - Shelf 2");
            productRepository.save(jeans);
            
            // Sample Books
            Product book1 = new Product("The Great Gatsby", "Classic novel by F. Scott Fitzgerald", 
                "Books", 12.99, 20, "BOOK-GATSBY", "Penguin Books", "Warehouse C - Shelf 1");
            productRepository.save(book1);
            
            Product book2 = new Product("To Kill a Mockingbird", "Harper Lee's masterpiece", 
                "Books", 11.99, 18, "BOOK-MOCKINGBIRD", "HarperCollins", "Warehouse C - Shelf 1");
            productRepository.save(book2);
            
            // Sample Home & Garden
            Product lamp = new Product("Table Lamp", "Modern LED table lamp", 
                "Home & Garden", 89.99, 12, "HOME-LAMP-TABLE", "Lighting Co.", "Warehouse D - Shelf 1");
            productRepository.save(lamp);
            
            Product plant = new Product("Indoor Plant", "Low-maintenance indoor plant", 
                "Home & Garden", 29.99, 35, "HOME-PLANT-INDOOR", "Green Thumb", "Warehouse D - Shelf 2");
            productRepository.save(plant);
            
            // Sample Sports
            Product basketball = new Product("Basketball", "Official size basketball", 
                "Sports", 24.99, 22, "SPORT-BASKETBALL", "Sports Gear", "Warehouse E - Shelf 1");
            productRepository.save(basketball);
            
            Product yogaMat = new Product("Yoga Mat", "Non-slip yoga mat", 
                "Sports", 34.99, 28, "SPORT-YOGAMAT", "Fitness Pro", "Warehouse E - Shelf 2");
            productRepository.save(yogaMat);
            
            logger.info("Sample products created successfully");
        }
    }
}
