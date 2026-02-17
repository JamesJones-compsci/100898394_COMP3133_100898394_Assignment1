// fixEmployees.js
require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/Employee'); // adjust path if needed

async function fixEmployees() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const employees = await Employee.find();
    console.log(`Found ${employees.length} employees`);

    for (const emp of employees) {
      let updated = false;

      // Check critical fields
      if (!emp.first_name) {
        emp.first_name = 'Unknown';
        updated = true;
      }
      if (!emp.last_name) {
        emp.last_name = 'Unknown';
        updated = true;
      }
      if (!emp.email) {
        emp.email = `unknown${emp._id}@example.com`;
        updated = true;
      }
      if (!emp.designation) {
        emp.designation = 'Staff';
        updated = true;
      }
      if (!emp.salary || emp.salary < 1000) {
        emp.salary = 1000;
        updated = true;
      }
      if (!emp.date_of_joining) {
        emp.date_of_joining = new Date();
        updated = true;
      }
      if (!emp.department) {
        emp.department = 'General';
        updated = true;
      }
      if (!emp.employee_photo) {
        emp.employee_photo = 'https://picsum.photos/1313';
        updated = true;
      }

      // Normalize gender to match enum
      if (!['Male', 'Female', 'Other'].includes(emp.gender)) {
        // Default to 'Other' if missing or invalid
        emp.gender = 'Other';
        updated = true;
      }

      if (updated) {
        emp.updated_at = new Date();
        await emp.save();
        console.log(`Updated employee: ${emp._id}`);
      }
    }

    console.log('Employee fix completed successfully');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error fixing employees:', err);
  }
}

fixEmployees();