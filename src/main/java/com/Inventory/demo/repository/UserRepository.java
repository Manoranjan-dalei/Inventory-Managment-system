package com.Inventory.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Inventory.demo.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(User.UserRole role);
    
    List<User> findByActive(boolean active);
    
    long countByActiveTrue();
    
    @Query("SELECT u FROM User u WHERE u.lastLogin >= :since")
    List<User> findRecentlyActiveUsers(@Param("since") java.time.LocalDateTime since);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") User.UserRole role);
}