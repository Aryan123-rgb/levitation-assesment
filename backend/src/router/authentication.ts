import express from "express";
import { loginUser, registerUser } from "../controllers/register";
import { handleFormSubmit, handleGetAllFormByUserId } from "../controllers/formSubmit";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

export default (router: express.Router) => {
  router.post("/auth/register", registerUser);
  router.post("/auth/login", loginUser);
  router.post("/form/submit", upload.single("file"), handleFormSubmit);
  router.post('/form/getData',handleGetAllFormByUserId)
};
