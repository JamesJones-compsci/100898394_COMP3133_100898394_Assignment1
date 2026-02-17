const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');

const resolvers = {
  Query: {
    login: async (_, { usernameOrEmail, password }) => {
      const user = await User.findOne({ 
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] 
      });
      if (!user) throw new Error('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Incorrect password');

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    getAllEmployees: async () => await Employee.find(),
    searchEmployeeByEid: async (_, { eid }) => await Employee.findById(eid),
    searchEmployeeByFilter: async (_, { designation, department }) => {
      const filter = {};
      if (designation) filter.designation = designation;
      if (department) filter.department = department;
      return await Employee.find(filter);
    }
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) throw new Error('User already exists');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    },

    addEmployee: async (_, { employeeInput }) => {
      if (employeeInput.employee_photo) {
        const result = await cloudinary.uploader.upload(employeeInput.employee_photo, {
          folder: 'employees'
        });
        employeeInput.employee_photo = result.secure_url;
      }
      const employee = new Employee(employeeInput);
      await employee.save();
      return employee;
    },

    updateEmployee: async (_, { eid, employeeInput }) => {
      if (employeeInput.employee_photo) {
        const result = await cloudinary.uploader.upload(employeeInput.employee_photo, {
          folder: 'employees'
        });
        employeeInput.employee_photo = result.secure_url;
      }
      const employee = await Employee.findByIdAndUpdate(eid, employeeInput, { new: true });
      if (!employee) throw new Error('Employee not found');
      return employee;
    },

    deleteEmployee: async (_, { eid }) => {
      const employee = await Employee.findByIdAndDelete(eid);
      if (!employee) throw new Error('Employee not found');
      return 'Employee deleted successfully';
    }
  }
};

module.exports = resolvers;