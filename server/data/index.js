const users = require('./users.json');
const posts = require('./posts.json');
const students = require('./students.json');
// Something more

module.exports = () => ({
  users: users,
  posts: posts,
  students: students
});