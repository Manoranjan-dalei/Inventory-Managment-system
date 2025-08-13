package com.Inventory.demo.config;

import com.Inventory.demo.entity.Product;
import com.Inventory.demo.entity.User;
import com.Inventory.demo.repository.ProductRepository;
import com.Inventory.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize default users if none exist
        if (userRepository.count() == 0) {
            initializeUsers();
        }

        // Initialize sample products if none exist
        if (productRepository.count() == 0) {
            initializeProducts();
        }
    }

    private void initializeUsers() {
        // Create admin user
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setEmail("admin@imspro.com");
        admin.setRole(User.UserRole.ADMIN);
        admin.setFullName("System Administrator");
        admin.setActive(true);
        userRepository.save(admin);

        // Create regular user
        User user = new User();
        user.setUsername("user");
        user.setPassword(passwordEncoder.encode("user123"));
        user.setEmail("user@imspro.com");
        user.setRole(User.UserRole.USER);
        user.setFullName("Regular User");
        user.setActive(true);
        userRepository.save(user);

        System.out.println("Default users initialized successfully!");
    }

    private void initializeProducts() {
        // Sample products
        Product laptop = new Product();
        laptop.setName("Laptop Dell XPS 13");
        laptop.setDescription("High-performance laptop with Intel i7 processor");
        laptop.setCategory("Electronics");
        laptop.setPrice(1299.99);
        laptop.setQuantity(15);
        laptop.setSku("LAP-DELL-XPS13");
        laptop.setSupplier("Dell Inc.");
        laptop.setLocation("Warehouse A");
        productRepository.save(laptop);

        Product mouse = new Product();
        mouse.setName("Wireless Mouse");
        mouse.setDescription("Ergonomic wireless mouse with precision tracking");
        mouse.setCategory("Accessories");
        mouse.setPrice(29.99);
        mouse.setQuantity(45);
        mouse.setSku("ACC-MOUSE-WL");
        mouse.setSupplier("Logitech");
        mouse.setLocation("Warehouse B");
        productRepository.save(mouse);

        Product keyboard = new Product();
        keyboard.setName("Mechanical Keyboard");
        keyboard.setDescription("RGB mechanical keyboard with Cherry MX switches");
        keyboard.setCategory("Accessories");
        keyboard.setPrice(89.99);
        keyboard.setQuantity(8);
        keyboard.setSku("ACC-KB-MECH");
        keyboard.setSupplier("Corsair");
        keyboard.setLocation("Warehouse A");
        productRepository.save(keyboard);

        Product monitor = new Product();
        monitor.setName("4K Monitor");
        monitor.setDescription("27-inch 4K Ultra HD monitor with HDR");
        monitor.setCategory("Electronics");
        monitor.setPrice(399.99);
        monitor.setQuantity(0);
        monitor.setSku("MON-4K-27");
        monitor.setSupplier("LG Electronics");
        monitor.setLocation("Warehouse C");
        productRepository.save(monitor);

        Product cable = new Product();
        cable.setName("USB-C Cable");
        cable.setDescription("High-speed USB-C cable for data transfer and charging");
        cable.setCategory("Accessories");
        cable.setPrice(12.99);
        cable.setQuantity(120);
        cable.setSku("CAB-USB-C");
        cable.setSupplier("Anker");
        cable.setLocation("Warehouse B");
        productRepository.save(cable);

        System.out.println("Sample products initialized successfully!");
    }
}
