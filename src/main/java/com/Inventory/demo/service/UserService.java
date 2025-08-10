package com.Inventory.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Inventory.demo.entity.User;
import com.Inventory.demo.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        if (user.getId() == null) {
            user.setCreatedAt(LocalDateTime.now());
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User authenticate(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // In a real application, you would hash the password
            if (user.getPassword().equals(password) && user.isActive()) {
                return user;
            }
        }
        return null;
    }

    public void updateLastLogin(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
        }
    }

    public boolean isUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public boolean isEmailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRoleIgnoreCase(role);
    }

    public long getTotalUsers() {
        return userRepository.count();
    }

    public long getActiveUsers() {
        return userRepository.countByActiveTrue();
    }

    // Initialize default users if none exist
    public void initializeDefaultUsers() {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = new User("admin", "admin123", "admin@imspro.com", "ADMIN", "System Administrator");
            userRepository.save(admin);

            // Create regular user
            User user = new User("user", "user123", "user@imspro.com", "USER", "Regular User");
            userRepository.save(user);
        }
    }
}