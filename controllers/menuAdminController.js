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
    const role = req.user.role;
    const filterMenuByRole = await menuModel.find({
      role: { $in: [role] },
    });

    res.status(200).json({
      status: true,
      userMenu: filterMenuByRole,
    });
  } catch (error) {
    console.log("error", error);
    return next(error);
  }
};

export const allMenusAdmin = async (req, res, next) => {
  try {
    console.log(req.query);
    const role = req.query.role;
    const MenuList = await menuModel.find({});
    const filterMenuByRole = await menuModel.find({
      role: { $in: [role] },
    });

    res.status(200).json({
      status: true,
      userMenu: filterMenuByRole,
      MenuList: MenuList,
    });
  } catch (error) {
    console.log("error", error);
    return next(error);
  }
};
