const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const userController = require("./controllers/userController");

router.get("/users", userController.browse);
router.get("/users/:id", userController.read);
router.put("/users/:id", userController.edit);
router.post("/users", userController.add);
router.delete("/users/:id", userController.destroy);

const  tournamentParticipationController = require("./controllers/tournamentParticipationController");

router.get("/tournament-participation",  tournamentParticipationController.browse);
router.get("/tournament-participation/:id", tournamentParticipationController.read);
router.put("/tournament-participation/:id", tournamentParticipationController.edit);
router.post("/tournament-participation", tournamentParticipationController.add);
router.delete("/tournament-participation/:id", tournamentParticipationController.destroy);

module.exports = router;
