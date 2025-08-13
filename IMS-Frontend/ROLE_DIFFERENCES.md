# Role-Based Access Control (RBAC) in IMS

## Overview

The Inventory Management System now implements proper role-based access control with two distinct user roles: **Admin** and **User**.

## Role Differences

### 🔐 Admin Role

**Credentials:** `admin` / `admin123`

**Full Access Permissions:**

- ✅ **Dashboard**: View all statistics and data
- ✅ **Products**: View, edit, and delete products
- ✅ **Add Product**: Create new products
- ✅ **Edit Product**: Modify existing products
- ✅ **Reports**: View all reports and analytics
- ✅ **About**: View system information

**UI Features:**

- Quick Actions section on Dashboard
- Edit and Delete buttons on Products page
- Analytics and charts on Reports page
- "Add Product" link in sidebar navigation
- Administrator badge on Dashboard

### 👤 User Role

**Credentials:** `user` / `user123`

**Limited Access Permissions:**

- ✅ **Dashboard**: View statistics (read-only)
- ✅ **Products**: View products only (no edit/delete)
- ❌ **Add Product**: No access
- ❌ **Edit Product**: No access
- ✅ **Reports**: View reports only (no export)
- ✅ **About**: View system information

**UI Features:**

- No Quick Actions section on Dashboard
- No Edit/Delete buttons on Products page
- View-only analytics and charts on Reports page
- No "Add Product" link in sidebar navigation
- Standard user interface

## Technical Implementation

### Permission System

The system uses a granular permission-based approach:

```javascript
const permissions = {
  ADMIN: [
    "view_dashboard",
    "view_products",
    "create_products",
    "edit_products",
    "delete_products",
    "view_reports",
    "view_about",
  ],
  USER: ["view_dashboard", "view_products", "view_reports", "view_about"],
};
```

### Route Protection

- **PermissionRoute Component**: Protects admin-only routes
- **Conditional Rendering**: UI elements show/hide based on permissions
- **Sidebar Filtering**: Navigation items filtered by user permissions

### Key Components Updated

1. **AuthContext**: Added `hasPermission()`, `isAdmin()`, `isUser()` functions
2. **Sidebar**: Filters navigation items based on permissions
3. **Products Page**: Conditionally shows edit/delete actions
4. **Reports Page**: Conditionally shows export options
5. **Dashboard**: Shows different content and quick actions
6. **App.jsx**: Implements route-level protection

## Testing the Differences

1. **Login as Admin** (`admin` / `admin123`):

   - Navigate to Products page → See Edit/Delete buttons
   - Navigate to Reports page → See Export options
   - Navigate to Dashboard → See Quick Actions section

2. **Login as User** (`user` / `user123`):
   - Navigate to Products page → No Edit/Delete buttons
   - Navigate to Reports page → No Export options
   - Navigate to Dashboard → No Quick Actions section
   - Try to access `/products/add` → Redirected to Dashboard

## Security Features

- **Route-level Protection**: Unauthorized users redirected
- **Component-level Protection**: UI elements hidden for unauthorized users
- **Permission-based Navigation**: Sidebar shows only accessible features
- **Mock Authentication**: Ready for backend integration

## Future Enhancements

- Backend API integration for real authentication
- Database-driven user roles and permissions
- Audit logging for admin actions
- User management interface for admins
- More granular permissions (e.g., view-only reports, limited product categories)
