package com.Inventory.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.Inventory.demo.entity.Product;
import com.Inventory.demo.service.ProductService;
import java.util.Optional;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    // Home page
    @GetMapping("/")
    public String home() {
        return "index";
    }

    // List all products
    @GetMapping
    public String listProducts(Model model) {
        try {
            List<Product> products = productService.getAllProducts();
            model.addAttribute("products", products);
            logger.info("Retrieved {} products", products.size());
        } catch (Exception e) {
            logger.error("Error retrieving products", e);
            model.addAttribute("error", "Failed to load products");
        }
        return "list";
    }

    // Show form to add a new product
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("product", new Product());
        return "add";
    }

    // Save a new product
    @PostMapping("/add")
    public String saveProduct(@Valid @ModelAttribute Product product, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
        try {
            // Check for validation errors
            if (bindingResult.hasErrors()) {
                logger.error("Validation errors: {}", bindingResult.getAllErrors());
                redirectAttributes.addFlashAttribute("error", "Please fix the validation errors");
                return "redirect:/products/add";
            }
            
            // Debug logging to see what data is being received
            logger.info("Received product data:");
            logger.info("Name: {}", product.getName());
            logger.info("Category: {}", product.getCategory());
            logger.info("Description: {}", product.getDescription());
            logger.info("Price: {}", product.getPrice());
            logger.info("Quantity: {}", product.getQuantity());
            logger.info("SKU: {}", product.getSku());
            logger.info("Supplier: {}", product.getSupplier());
            logger.info("Location: {}", product.getLocation());
            
            // Save the product
            Product savedProduct = productService.saveProduct(product);
            
            // Debug logging to see what was actually saved
            logger.info("Saved product data:");
            logger.info("ID: {}", savedProduct.getId());
            logger.info("Name: {}", savedProduct.getName());
            logger.info("Category: {}", savedProduct.getCategory());
            logger.info("Description: {}", savedProduct.getDescription());
            logger.info("Price: {}", savedProduct.getPrice());
            logger.info("Quantity: {}", savedProduct.getQuantity());
            logger.info("SKU: {}", savedProduct.getSku());
            logger.info("Supplier: {}", savedProduct.getSupplier());
            logger.info("Location: {}", savedProduct.getLocation());
            
            redirectAttributes.addFlashAttribute("success", "Product added successfully!");
            logger.info("Product saved successfully: {}", product.getName());
        } catch (Exception e) {
            logger.error("Error saving product", e);
            redirectAttributes.addFlashAttribute("error", "Failed to save product: " + e.getMessage());
        }
        return "redirect:/products";
    }

    // Show form to edit a product
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        try {
            Optional<Product> productOpt = productService.getProductById(id);
            if (productOpt.isPresent()) {
                model.addAttribute("product", productOpt.get());
                logger.info("Editing product: {}", productOpt.get().getName());
            } else {
                redirectAttributes.addFlashAttribute("error", "Product not found");
                return "redirect:/products";
            }
        } catch (Exception e) {
            logger.error("Error retrieving product for editing", e);
            redirectAttributes.addFlashAttribute("error", "Failed to load product");
            return "redirect:/products";
        }
        return "edit";
    }

    // Update a product
    @PostMapping("/edit")
    public String updateProduct(@Valid @ModelAttribute Product product, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
        try {
            // Check for validation errors
            if (bindingResult.hasErrors()) {
                logger.error("Validation errors: {}", bindingResult.getAllErrors());
                redirectAttributes.addFlashAttribute("error", "Please fix the validation errors");
                return "redirect:/products/edit/" + product.getId();
            }
            
            product.setUpdatedAt(java.time.LocalDateTime.now());
            productService.saveProduct(product);
            redirectAttributes.addFlashAttribute("success", "Product updated successfully!");
            logger.info("Product updated successfully: {}", product.getName());
        } catch (Exception e) {
            logger.error("Error updating product", e);
            redirectAttributes.addFlashAttribute("error", "Failed to update product");
        }
        return "redirect:/products";
    }

    // Delete a product
    @GetMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            Optional<Product> productOpt = productService.getProductById(id);
            if (productOpt.isPresent()) {
                productService.deleteProduct(id);
                redirectAttributes.addFlashAttribute("success", "Product deleted successfully!");
                logger.info("Product deleted successfully: {}", productOpt.get().getName());
            } else {
                redirectAttributes.addFlashAttribute("error", "Product not found");
            }
        } catch (Exception e) {
            logger.error("Error deleting product", e);
            redirectAttributes.addFlashAttribute("error", "Failed to delete product");
        }
        return "redirect:/products";
    }

    // Search products
    @GetMapping("/search")
    public String searchProducts(@RequestParam String query, Model model) {
        try {
            List<Product> products = productService.searchProducts(query);
            model.addAttribute("products", products);
            model.addAttribute("searchQuery", query);
            logger.info("Search performed for: '{}', found {} results", query, products.size());
        } catch (Exception e) {
            logger.error("Error searching products", e);
            model.addAttribute("error", "Failed to search products");
        }
        return "list";
    }

    // API endpoints for AJAX calls
    @GetMapping("/api/products")
    @ResponseBody
    public List<Product> getAllProductsApi() {
        return productService.getAllProducts();
    }

    @GetMapping("/api/products/{id}")
    @ResponseBody
    public Optional<Product> getProductApi(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping("/api/products")
    @ResponseBody
    public Product createProductApi(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @PutMapping("/api/products/{id}")
    @ResponseBody
    public Product updateProductApi(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        product.setUpdatedAt(java.time.LocalDateTime.now());
        return productService.saveProduct(product);
    }

    @DeleteMapping("/api/products/{id}")
    @ResponseBody
    public String deleteProductApi(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }

    // Debug endpoint to check database
    @GetMapping("/debug/database")
    @ResponseBody
    public String debugDatabase() {
        try {
            List<Product> allProducts = productService.getAllProducts();
            StringBuilder result = new StringBuilder();
            result.append("Database Debug Information:\n");
            result.append("Total products: ").append(allProducts.size()).append("\n\n");
            
            for (Product product : allProducts) {
                result.append("Product ID: ").append(product.getId()).append("\n");
                result.append("Name: ").append(product.getName()).append("\n");
                result.append("Category: ").append(product.getCategory()).append("\n");
                result.append("Description: ").append(product.getDescription()).append("\n");
                result.append("Price: ").append(product.getPrice()).append("\n");
                result.append("Quantity: ").append(product.getQuantity()).append("\n");
                result.append("SKU: ").append(product.getSku()).append("\n");
                result.append("Supplier: ").append(product.getSupplier()).append("\n");
                result.append("Location: ").append(product.getLocation()).append("\n");
                result.append("Created: ").append(product.getCreatedAt()).append("\n");
                result.append("Updated: ").append(product.getUpdatedAt()).append("\n");
                result.append("---\n");
            }
            
            return result.toString();
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    // Test endpoint to create a simple product
    @GetMapping("/test/create-product")
    @ResponseBody
    public String testCreateProduct() {
        try {
            Product testProduct = new Product();
            testProduct.setName("Test Product");
            testProduct.setCategory("Test Category");
            testProduct.setDescription("This is a test product");
            testProduct.setPrice(99.99);
            testProduct.setQuantity(10);
            testProduct.setSku("TEST-SKU-001");
            testProduct.setSupplier("Test Supplier");
            testProduct.setLocation("Test Location");
            
            Product savedProduct = productService.saveProduct(testProduct);
            
            return "Test product created successfully!\n" +
                   "ID: " + savedProduct.getId() + "\n" +
                   "Name: " + savedProduct.getName() + "\n" +
                   "Category: " + savedProduct.getCategory() + "\n" +
                   "Price: " + savedProduct.getPrice() + "\n" +
                   "Quantity: " + savedProduct.getQuantity();
        } catch (Exception e) {
            return "Error creating test product: " + e.getMessage();
        }
    }
}