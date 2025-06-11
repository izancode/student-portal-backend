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
    const role = req.query.role;
    const MenuList = await menuModel.find({});
    const filterMenuByRole = await menuModel.find({
      role: { $in: [role] },
    });

    res.status(200).json({
      status: true,
      userMenu: filterMenuByRole,
      MenuList: MenuList,
      role: role,
    });
  } catch (error) {
    console.log("error", error);
    return next(error);
  }
};
export const updateMenusAdmin = async (req, res, next) => {
  try {
    const MenuList = await menuModel.findById({ _id: req.body._id });

    const role = req.body.role;
    const isRoleAvailable = MenuList.role.includes(role);

    if (!isRoleAvailable) {
      MenuList.role.push(role);
    } else {
      const arrayPostion = MenuList.role.indexOf(role);

      MenuList.role.splice(arrayPostion, 1);
    }
    await MenuList.save();
    res.status(200).json({
      status: true,
      message: `Menu has been updated successfully for ${role}`,
    });
  } catch (error) {
    console.log("error", error);
    return next(error);
  }
};
