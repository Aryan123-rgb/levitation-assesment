import FormModel from "../db/form";
import express from "express";

export const handleFormSubmit = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userDetails, selectedOptions, userId, file } = req.body;
    const userInfo = JSON.parse(userDetails);
    const optionInfo = JSON.parse(selectedOptions);
    const fileInfo = JSON.parse(file);
    const formDoc = await FormModel.create({
      userDetails: userInfo,
      selectedOptions: optionInfo,
      userId,
      Files: fileInfo,
    });
    res.json(formDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const handleGetAllFormByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.body;
    const formInfo =await FormModel.find({ userId });
    res.json(formInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
