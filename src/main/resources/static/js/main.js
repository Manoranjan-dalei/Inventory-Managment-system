// Main JavaScript file for Inventory Management System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initLoginForm();
    initStatsCounter();
    initProductManagement();
    initFormValidation();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation initialization
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .stat-item, .floating-box, .floating-element').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Login form functionality
function initLoginForm() {
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    const credentialTabs = document.querySelectorAll('.credential-tab');
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.querySelector('input[type="password"]');

    // User type selection
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            userTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Add hidden input for user type
            let hiddenInput = document.querySelector('input[name="userType"]');
            if (!hiddenInput) {
                hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'userType';
                document.querySelector('.login-form').appendChild(hiddenInput);
            }
            hiddenInput.value = this.dataset.type;
        });
    });

    // Credential tabs
    credentialTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            credentialTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const role = this.dataset.role;
            document.querySelectorAll('.credential-info').forEach(info => {
                info.style.display = 'none';
            });
            document.getElementById(role + '-cred').style.display = 'block';
        });
    });

    // Password toggle
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Auto-fill credentials
    credentialTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const role = this.dataset.role;
            const usernameInput = document.querySelector('input[name="username"]');
            const passwordInput = document.querySelector('input[name="password"]');
            
            if (role === 'user') {
                usernameInput.value = 'user';
                passwordInput.value = 'user123';
            } else if (role === 'admin') {
                usernameInput.value = 'admin';
                passwordInput.value = 'admin123';
            }
        });
    });
}

// Stats counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                countUp(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

// Product management functionality
function initProductManagement() {
    // Delete confirmation
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this product?')) {
                e.preventDefault();
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        // Submit the form on input after debounce
        const form = searchInput.closest('form');
        let debounceTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                if (form) {
                    form.submit();
                }
            }, 500);
        });

        // Add form submission validation
        if (form) {
            form.addEventListener('submit', function(e) {
                const searchTerm = searchInput.value.trim();
                if (searchTerm.length < 2) {
                    e.preventDefault();
                    alert('Search query must be at least 2 characters long.');
                    return false;
                }
            });
        }
    }

    // Sort functionality
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const column = this.dataset.column;
            const table = document.querySelector('.product-table table');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));

            rows.sort((a, b) => {
                const aValue = a.querySelector(`td[data-${column}]`).textContent.trim().toLowerCase();
                const bValue = b.querySelector(`td[data-${column}]`).textContent.trim().toLowerCase();

                if (column === 'price' || column === 'quantity') {
                    return parseFloat(aValue.replace(/[^0-9.-]+/g, '')) - parseFloat(bValue.replace(/[^0-9.-]+/g, ''));
                }

                return aValue.localeCompare(bValue);
            });

            rows.forEach(row => tbody.appendChild(row));
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else {
                    clearFieldError(field);
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    showFieldError(field, 'Please enter a valid email address');
                }
            });
            
            // Password validation
            const passwordFields = form.querySelectorAll('input[type="password"]');
            passwordFields.forEach(field => {
                if (field.value && field.value.length < 6) {
                    isValid = false;
                    showFieldError(field, 'Password must be at least 6 characters');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

// Utility functions
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#dc3545';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e0e0e0';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    toast.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// AJAX utility functions
function makeRequest(url, method = 'GET', data = null) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
}

// Product CRUD operations
const ProductAPI = {
    getAll: () => makeRequest('/api/products'),
    getById: (id) => makeRequest(`/api/products/${id}`),
    create: (product) => makeRequest('/api/products', 'POST', product),
    update: (id, product) => makeRequest(`/api/products/${id}`, 'PUT', product),
    delete: (id) => makeRequest(`/api/products/${id}`, 'DELETE')
};

// Initialize product table with AJAX
function loadProducts() {
    ProductAPI.getAll()
        .then(products => {
            const tbody = document.querySelector('.product-table tbody');
            if (tbody) {
                tbody.innerHTML = '';
                products.forEach(product => {
                    const row = createProductRow(product);
                    tbody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Error loading products:', error);
            showToast('Error loading products', 'error');
        });
}

function createProductRow(product) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td data-name="${product.name}">${product.name}</td>
        <td data-category="${product.category}">${product.category}</td>
        <td data-price="${product.price}">$${product.price}</td>
        <td data-quantity="${product.quantity}">${product.quantity}</td>
        <td>
            <div class="action-buttons">
                <a href="/products/edit/${product.id}" class="btn-edit">
                    <i class="fas fa-edit"></i> Edit
                </a>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </td>
    `;
    return row;
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        ProductAPI.delete(id)
            .then(() => {
                showToast('Product deleted successfully', 'success');
                loadProducts();
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                showToast('Error deleting product', 'error');
            });
    }
}

// Auto-load products if on products page
if (window.location.pathname === '/products' || window.location.pathname === '/') {
    loadProducts();
}

// Export functions for global use
window.showToast = showToast;
window.deleteProduct = deleteProduct;
window.ProductAPI = ProductAPI;