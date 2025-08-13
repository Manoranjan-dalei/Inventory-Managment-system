import { 
  CubeIcon, 
  ChartBarIcon, 
  ShieldCheckIcon,
  CogIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const features = [
    {
      name: 'Product Management',
      description: 'Easily add, edit, and manage your inventory products with detailed information.',
      icon: CubeIcon
    },
    {
      name: 'Real-time Analytics',
      description: 'Get insights into your inventory with comprehensive reports and analytics.',
      icon: ChartBarIcon
    },
    {
      name: 'Secure Access',
      description: 'Role-based access control ensures data security and proper user permissions.',
      icon: ShieldCheckIcon
    },
    {
      name: 'Automated Workflows',
      description: 'Streamline your inventory processes with automated alerts and notifications.',
      icon: CogIcon
    },
    {
      name: 'Multi-user Support',
      description: 'Collaborate with your team with multi-user access and activity tracking.',
      icon: UserGroupIcon
    },
    {
      name: 'Cloud-based',
      description: 'Access your inventory from anywhere with our cloud-based solution.',
      icon: GlobeAltIcon
    }
  ];

  const techStack = [
    'React.js',
    'Tailwind CSS',
    'Spring Boot',
    'MySQL',
    'RESTful APIs',
    'Responsive Design'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">About IMS</h1>
        <p className="text-gray-600 mt-1">Inventory Management System - Modern, Efficient, Reliable</p>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Overview</h2>
        <p className="text-gray-600 leading-relaxed">
          The Inventory Management System (IMS) is a comprehensive solution designed to streamline 
          inventory operations for businesses of all sizes. Built with modern technologies, it provides 
          real-time tracking, analytics, and management capabilities to help you maintain optimal 
          inventory levels and improve operational efficiency.
        </p>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.name} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">{feature.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techStack.map((tech) => (
            <div key={tech} className="text-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Version Details</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div><strong>Version:</strong> 1.0.0</div>
              <div><strong>Release Date:</strong> December 2024</div>
              <div><strong>License:</strong> MIT</div>
              <div><strong>Support:</strong> Available</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">System Requirements</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div><strong>Browser:</strong> Chrome, Firefox, Safari, Edge</div>
              <div><strong>Resolution:</strong> 1024x768 or higher</div>
              <div><strong>JavaScript:</strong> Enabled</div>
              <div><strong>Internet:</strong> Required for cloud features</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact & Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Get Help</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div><strong>Email:</strong> support@ims.com</div>
              <div><strong>Phone:</strong> +1 (555) 123-4567</div>
              <div><strong>Hours:</strong> Mon-Fri 9AM-6PM EST</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Documentation</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div><strong>User Guide:</strong> Available in Help section</div>
              <div><strong>API Docs:</strong> For developers</div>
              <div><strong>Video Tutorials:</strong> Coming soon</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
