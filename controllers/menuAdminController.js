import menuModel from "../models/menuAdminModels.js";

export const menuAdminController = async (req, res, next) => {
  try {
    const menu = { ...req.body };
    await menuModel.create(menu);
    res.status(200).json({
      status: true,
      message: "Menu has been Added successfully",
    });
  } catch (error) {
    console.log("error", error);
    return next(error);
  }
};

export const allMenus = async (req, res, next) => {
  try {
    const menuModelStore = await menuModel.find({});
    res.status(200).json({
      menuModelStore,
    });
  } catch (error) {
    console.log("error", error);
    return next(error);
  }
};

export const allMenusUpdate = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("error", error);
    return next(error);
  }
};
