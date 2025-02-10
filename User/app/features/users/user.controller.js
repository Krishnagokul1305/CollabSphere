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

module.exports = {
  getAlluser,
  getuserById,
  createuser,
  updateuser,
  deleteuser,
};
