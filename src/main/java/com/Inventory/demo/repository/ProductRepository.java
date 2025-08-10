package com.Inventory.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Inventory.demo.entity.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Search methods
    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCategoryContainingIgnoreCase(
        String name, String description, String category);
    
    List<Product> findByCategoryIgnoreCase(String category);
    
    List<Product> findByQuantityLessThan(int quantity);
    
    List<Product> findByPriceBetween(double minPrice, double maxPrice);
    
    List<Product> findBySupplierIgnoreCase(String supplier);
    
    // Custom queries
    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.category IS NOT NULL")
    List<String> findDistinctCategories();
    
    @Query("SELECT SUM(p.price * p.quantity) FROM Product p")
    Double getTotalInventoryValue();
    
    @Query("SELECT COUNT(p) FROM Product p WHERE p.quantity < :threshold")
    Long countLowStockProducts(@Param("threshold") int threshold);
    
    @Query("SELECT p FROM Product p WHERE p.updatedAt >= :since")
    List<Product> findRecentlyUpdated(@Param("since") java.time.LocalDateTime since);
}