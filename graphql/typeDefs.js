const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  email: String!
}

type Employee {
  id: ID!
  first_name: String!
  last_name: String!
  email: String!
  gender: String
  designation: String!
  salary: Float!
  date_of_joining: String!
  department: String!
  employee_photo: String
}

type AuthPayload {
  token: String!
  user: User!
}

input EmployeeInput {
  first_name: String!
  last_name: String!
  email: String!
  gender: String
  designation: String!
  salary: Float!
  date_of_joining: String!
  department: String!
  employee_photo: String
}

type Query {
  login(usernameOrEmail: String!, password: String!): AuthPayload
  getAllEmployees: [Employee]
  searchEmployeeByEid(eid: ID!): Employee
  searchEmployeeByFilter(designation: String, department: String): [Employee]
}

type Mutation {
  signup(username: String!, email: String!, password: String!): User
  addEmployee(employeeInput: EmployeeInput!): Employee
  updateEmployee(eid: ID!, employeeInput: EmployeeInput!): Employee
  deleteEmployee(eid: ID!): String
}
`;

module.exports = typeDefs;