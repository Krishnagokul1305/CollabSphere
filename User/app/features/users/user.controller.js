const catchError = require("../../utils/asyncHandler");
const userService = require("./user.service");

const getAlluser = catchError(async (req, res, next) => {
  const data = await userService.getAll();
  res.status(200).json({
    status: "success",
    data,
  });
});

const getuserById = catchError(async (req, res, next) => {
  const { id } = req.params;
  const data = await userService.getById(id);
  res.status(200).json({
    status: "success",
    data,
  });
});

const createuser = catchError(async (req, res, next) => {
  const newUser = await userService.create(req.body);
  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

const updateuser = catchError(async (req, res, next) => {
  const updatedData = userService.updateById(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: updatedData,
  });
});

const deleteuser = catchError(async (req, res, next) => {
  const { id } = req.params;
  await userService.deletebyId(id);
});

const getMultipleUsers = catchError(async (req, res, next) => {
  const { ids } = req.body;
  if (!ids || ids.length === 0) {
    res.status(200).status({
      status: "success",
      data: [],
    });
  }
  const data = await userService.getMultipleUsers(ids);
  res.status(200).json({
    status: "success",
    data,
  });
});

module.exports = {
  getAlluser,
  getMultipleUsers,
  getuserById,
  createuser,
  updateuser,
  deleteuser,
};
