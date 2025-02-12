const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./auth');

// Middleware for static files and JSON parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Middleware for handling sessions
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Middleware for initializing Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/categories/:category', (req, res) => {
  const category = req.params.category;
  res.render(`categories/${category}`);
});

app.get('/games/:game', (req, res) => {
  const game = req.params.game;
  res.render(`games/${game}`);
});

// Release notes and versioning information
const releaseNotes = `
  New Release 🚀
  - 🐛 Added a bug report template in .github/ISSUE_TEMPLATE/bug_report.md to help users report issues more effectively.
  - 🚀 Updated the backend server in backend/server.js to use Express.js with EJS templating and added routes for categories and games.
  - 🕹️ Added new game categories and their respective HTML files in the Categories directory, such as Categories/ai.html, Categories/cat1.html, Categories/cat2.html, Categories/cat3.html, Categories/cat4.html, and Categories/cat5.html.
  - 🎨 Enhanced the CSS styles in CSS/styles.css to improve the overall appearance and user experience of the website.
  - 🏠 Updated the homepage in index.html to include new game categories, a suggestion form, and social media sharing options.
  - 📜 Added a code of conduct in other files/CODE_OF_CONDUCT.md to ensure a welcoming and inclusive community.
  - 🔒 Added a security policy in other files/SECURITY.md to inform users about supported versions and how to report vulnerabilities.
  - 📦 Added a new dependency, logrocket, in package.json for better logging and monitoring.
  - 📝 Updated the README file in README.md with new information and links to follow the project on social media.
  - 🗺️ Added new routes in routes/routes.js to handle category and game pages using Express.js.
  - 🦺 Added a footer partial in views/partials/footer.ejs to include social media sharing options on all pages.
  - 🧭 Added a navbar partial in views/partials/navbar.ejs to provide easy navigation across the website.
`;

app.get('/release-notes', (req, res) => {
  res.send(releaseNotes);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
