// // import some node modules for later

// const fs = require("node:fs");
// const path = require("node:path");

// // create express app

// const express = require("express");

// const app = express();

// // use some application-level middlewares

// app.use(express.json());

// const cors = require("cors");

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
//     optionsSuccessStatus: 200,
//   })
// );

// // import and mount the API routes

// const router = require("./router");

// app.use(router);

// // serve the `backend/public` folder for public resources

// app.use(express.static(path.join(__dirname, "../public")));

// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// // serve REACT APP

// const reactIndexFile = path.join(
//   __dirname,
//   "..",
//   "..",
//   "frontend",
//   "dist",
//   "index.html"
// );

// if (fs.existsSync(reactIndexFile)) {
//   // serve REACT resources

//   app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

//   // redirect all requests to the REACT index file

//   app.get("*", (req, res) => {
//     res.sendFile(reactIndexFile);
//   });
// }


// // ready to export

// module.exports = app;



// import some node modules for later
// const fs = require("node:fs");
// const path = require("node:path");
// const express = require("express");

// const app = express();

// app.use(express.json());

// const cors = require("cors");

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
//     optionsSuccessStatus: 200,
//   })
// );

// // Importez et montez les routes de l'application
// const router = require("./router");
// app.use(router);

// // Servez le dossier `backend/public` pour les ressources publiques
// app.use(express.static(path.join(__dirname, "../public")));
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// // Servez l'application REACT
// const reactIndexFile = path.join(
//   __dirname,
//   "..",
//   "..",
//   "frontend",
//   "dist",
//   "index.html"
// );

// if (fs.existsSync(reactIndexFile)) {
//   app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(reactIndexFile);
//   });
// }

// module.exports = app;



const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour gérer les CORS
const cors = require("cors");
app.use(cors({
  origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
  optionsSuccessStatus: 200,
}));

// Importez et utilisez le routeur principal
const router = require("./router");
app.use(router);

// Middleware pour servir les fichiers statiques dans `backend/public` et `backend/uploads`
app.use(express.static(path.join(__dirname, "../public")));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware pour servir l'application React (s'il existe)
const reactIndexPath = path.join(__dirname, "../../frontend/dist/index.html");
if (fs.existsSync(reactIndexPath)) {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(reactIndexPath);
  });
}

// Exportez l'application express
module.exports = app;