package com.Inventory.demo.controller;

import com.Inventory.demo.dto.ProductDto;
import com.Inventory.demo.entity.Product;
import com.Inventory.demo.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Get all products
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            List<ProductDto> productDtos = products.stream()
                    .map(ProductDto::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(productDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        try {
            Optional<Product> productOpt = productService.getProductById(id);
            if (productOpt.isPresent()) {
                return ResponseEntity.ok(new ProductDto(productOpt.get()));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Create new product
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody ProductDto productDto) {
        try {
            Product product = productDto.toEntity();
            Product savedProduct = productService.saveProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ProductDto(savedProduct));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update product
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDto productDto) {
        try {
            Optional<Product> productOpt = productService.getProductById(id);
            if (!productOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Product existingProduct = productOpt.get();
            // Update fields
            existingProduct.setName(productDto.getName());
            existingProduct.setDescription(productDto.getDescription());
            existingProduct.setCategory(productDto.getCategory());
            existingProduct.setPrice(productDto.getPrice());
            existingProduct.setQuantity(productDto.getQuantity());
            existingProduct.setSku(productDto.getSku());
            existingProduct.setSupplier(productDto.getSupplier());
            existingProduct.setLocation(productDto.getLocation());

            Product updatedProduct = productService.saveProduct(existingProduct);
            return ResponseEntity.ok(new ProductDto(updatedProduct));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            Optional<Product> productOpt = productService.getProductById(id);
            if (!productOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Search products by name or category
    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> searchProducts(@RequestParam String query) {
        try {
            List<Product> products = productService.searchProducts(query);
            List<ProductDto> productDtos = products.stream()
                    .map(ProductDto::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(productDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get products by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable String category) {
        try {
            List<Product> products = productService.getProductsByCategory(category);
            List<ProductDto> productDtos = products.stream()
                    .map(ProductDto::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(productDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get low stock products
    @GetMapping("/low-stock")
    public ResponseEntity<List<ProductDto>> getLowStockProducts() {
        try {
            List<Product> products = productService.getLowStockProducts(10); // Default threshold of 10
            List<ProductDto> productDtos = products.stream()
                    .map(ProductDto::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(productDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}