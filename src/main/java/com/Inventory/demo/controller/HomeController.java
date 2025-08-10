package com.Inventory.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.Inventory.demo.entity.User;
import com.Inventory.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.http.HttpSession;

@Controller
public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    private UserService userService;

    // Home page
    @GetMapping("/")
    public String home() {
        return "index";
    }

    // Login page
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    // Handle login
    @PostMapping("/login")
    public String login(@RequestParam String username, 
                       @RequestParam String password, 
                       @RequestParam(required = false) String userType,
                       HttpSession session, 
                       RedirectAttributes redirectAttributes) {
        try {
            User user = userService.authenticate(username, password);
            if (user != null) {
                // Check if user type matches (if specified)
                if (userType != null && !userType.isEmpty()) {
                    if (!user.getRole().equalsIgnoreCase(userType.toUpperCase())) {
                        redirectAttributes.addFlashAttribute("error", "Invalid user type for this account");
                        return "redirect:/login";
                    }
                }
                
                session.setAttribute("user", user);
                session.setAttribute("userId", user.getId());
                session.setAttribute("username", user.getUsername());
                session.setAttribute("userRole", user.getRole());
                
                // Update last login
                userService.updateLastLogin(user.getId());
                
                logger.info("User logged in successfully: {}", username);
                redirectAttributes.addFlashAttribute("success", "Welcome back, " + user.getFullName() + "!");
                
                return "redirect:/products";
            } else {
                redirectAttributes.addFlashAttribute("error", "Invalid username or password");
                return "redirect:/login";
            }
        } catch (Exception e) {
            logger.error("Error during login", e);
            redirectAttributes.addFlashAttribute("error", "Login failed. Please try again.");
            return "redirect:/login";
        }
    }

    // Logout
    @GetMapping("/logout")
    public String logout(HttpSession session, RedirectAttributes redirectAttributes) {
        session.invalidate();
        redirectAttributes.addFlashAttribute("success", "You have been logged out successfully");
        return "redirect:/";
    }

    // Dashboard (protected route)
    @GetMapping("/dashboard")
    public String dashboard(HttpSession session, Model model, RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            redirectAttributes.addFlashAttribute("error", "Please login to access the dashboard");
            return "redirect:/login";
        }
        
        model.addAttribute("user", user);
        return "dashboard";
    }

    // About page
    @GetMapping("/about")
    public String about() {
        return "about";
    }

    // Reports page (protected route)
    @GetMapping("/reports")
    public String reports(HttpSession session, Model model, RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            redirectAttributes.addFlashAttribute("error", "Please login to access reports");
            return "redirect:/login";
        }
        
        model.addAttribute("user", user);
        return "reports";
    }

    // Inventory page (protected route)
    @GetMapping("/inventory")
    public String inventory(HttpSession session, Model model, RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            redirectAttributes.addFlashAttribute("error", "Please login to access inventory");
            return "redirect:/login";
        }
        
        model.addAttribute("user", user);
        return "inventory";
    }

    // Help page
    @GetMapping("/help")
    public String help() {
        return "help";
    }

    // Contact page
    @GetMapping("/contact")
    public String contact() {
        return "contact";
    }

    // API Reference page
    @GetMapping("/api")
    public String apiReference() {
        return "api";
    }

    // Documentation page
    @GetMapping("/docs")
    public String documentation() {
        return "docs";
    }
}