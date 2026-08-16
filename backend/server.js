// require('dotenv').config();

// const mongoose = require('mongoose');
// const connectDB = require('./config/db');
// const { configureCloudinary } = require('./config/cloudinary');
// const Admin = require('./models/Admin');
// const app = require('./app');

// const PORT = process.env.PORT || 5000;

// const seedDefaultAdmin = async () => {
//   try {
//     const count = await Admin.countDocuments();
//     if (count === 0) {
//       const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@portfolio.com';
//       const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';

//       await Admin.create({
//         name: 'Admin',
//         email,
//         password,
//         role: 'superadmin',
//       });

//       console.log(`Default admin created — Email: ${email} / Password: ${password}`);
//     }
//   } catch (error) {
//     console.error('Error seeding default admin:', error.message);
//   }
// };

// const start = async () => {
//   try {
//     await connectDB();
//     configureCloudinary();
//     await seedDefaultAdmin();

//     app.listen(PORT, () => {
//       console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
//       console.log(`API available at http://localhost:${PORT}/api`);
//       console.log(`Health check: http://localhost:${PORT}/api/health`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error.message);
//     process.exit(1);
//   }
// };

// start();
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { configureCloudinary } = require('./config/cloudinary');
const Admin = require('./models/Admin');
const app = require('./app');

const PORT = process.env.PORT || 5000;

const seedDefaultAdmin = async () => {
  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@portfolio.com';
      const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';

      await Admin.create({
        name: 'Admin',
        email,
        password,
        role: 'super_admin',
      });

      console.log(`Default admin created — Email: ${email} / Password: ${password}`);
    }
  } catch (error) {
    console.error('Error seeding default admin:', error.message);
  }
};

const start = async () => {
  try {
    await connectDB();
    configureCloudinary();
    await seedDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

start();