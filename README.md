# COMP3133 Assignment 1 — Employee Management GraphQL API

## MongoDB Collections
Your database contains the following collections:

- **users**  
  Stores user accounts with fields: `id`, `username`, `email`, `password`, `created_at`, `updated_at`

- **employees**  
  Stores employee data with fields: `id`, `first_name`, `last_name`, `email`, `gender`, `designation`, `salary`, `date_of_joining`, `department`, `employee_photo`, `created_at`, `updated_at`

---

## Sample User Details
You can use the following account for testing:

- **Username:** jae  
- **Email:** jae@example.com  
- **Password:** 123456

---

### API Testing via Postman

### Signup Mutation
```json
{
  "query": "mutation { signup(username: \"jae\", email: \"jae@example.com\", password: \"123456\") { id username email } }"
}

Comments / Notes

All critical employee fields are validated and auto-filled using fixEmployees.js to prevent GraphQL query errors.

Use Cloudinary URLs for employee photos when testing addEmployee.

Ensure login is performed before executing mutations that require authentication.

Sample credentials can be reused for multiple tests without conflicts.