package com.Inventory.demo.controller;

import com.Inventory.demo.dto.AuthDto;
import com.Inventory.demo.entity.User;
import com.Inventory.demo.service.UserService;
import com.Inventory.demo.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<AuthDto.LoginResponse> login(@Valid @RequestBody AuthDto.LoginRequest loginRequest) {
        try {
            User user = userService.findByUsername(loginRequest.getUsername());

            if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // Update last login
                user.setLastLogin(java.time.LocalDateTime.now());
                userService.saveUser(user);

                // Generate JWT token
                String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

                return ResponseEntity.ok(new AuthDto.LoginResponse(token, user));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthDto.LoginResponse("Invalid username or password"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthDto.LoginResponse("Login failed"));
        }
    }

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<AuthDto.LoginResponse> register(@Valid @RequestBody AuthDto.RegisterRequest registerRequest) {
        try {
            // Check if username already exists
            if (userService.findByUsername(registerRequest.getUsername()) != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new AuthDto.LoginResponse("Username already exists"));
            }

            // Check if email already exists
            if (userService.findByEmail(registerRequest.getEmail()) != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new AuthDto.LoginResponse("Email already exists"));
            }

            // Create new user
            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setEmail(registerRequest.getEmail());
            user.setFullName(registerRequest.getFullName());

            // Set default role as USER if not specified
            if (registerRequest.getRole() != null && "ADMIN".equalsIgnoreCase(registerRequest.getRole())) {
                user.setRole(User.UserRole.ADMIN);
            } else {
                user.setRole(User.UserRole.USER);
            }

            User savedUser = userService.saveUser(user);

            // Generate JWT token
            String token = jwtUtil.generateToken(savedUser.getUsername(), savedUser.getRole().name());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthDto.LoginResponse(token, savedUser));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthDto.LoginResponse("Registration failed"));
        }
    }

    // Validate token endpoint
    @GetMapping("/validate")
    public ResponseEntity<AuthDto.LoginResponse> validateToken(@RequestHeader("Authorization") String token) {
        try {
            if (token != null && token.startsWith("Bearer ")) {
                String jwtToken = token.substring(7);
                String username = jwtUtil.extractUsername(jwtToken);
                String role = jwtUtil.extractRole(jwtToken);

                if (jwtUtil.validateToken(jwtToken, username)) {
                    User user = userService.findByUsername(username);
                    if (user != null) {
                        return ResponseEntity.ok(new AuthDto.LoginResponse(jwtToken, user));
                    }
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthDto.LoginResponse("Invalid token"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthDto.LoginResponse("Token validation failed"));
        }
    }
}
