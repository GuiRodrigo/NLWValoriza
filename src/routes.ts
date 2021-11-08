import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticate } from "./middlewares/EnsureAuthenticate";
import { ListUserSendComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagController";
import { ListUserController } from "./controllers/ListUserController"

const router = Router();

const createTagController = new CreateTagController();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiverComplimentsController =
  new ListUserReceiveComplimentsController();
const listTagControllers = new ListTagsController();
const listUserController = new ListUserController();

router.post("/users", createUserController.handle);

router.post(
  "/tags",
  ensureAuthenticate,
  ensureAdmin,
  createTagController.handle
);

router.post("/login", authenticateUserController.handle);
router.post(
  "/compliments",
  ensureAuthenticate,
  createComplimentController.handle
);

router.get(
  "/users/compliments/send",
  ensureAuthenticate,
  listUserSendComplimentsController.handle
);

router.get(
  "/users/compliments/receiver",
  ensureAuthenticate,
  listUserReceiverComplimentsController.handle
);

router.get("/tags",ensureAuthenticate, listTagControllers.handle);

router.get("/users",ensureAuthenticate,listUserController.handle)

export { router };
