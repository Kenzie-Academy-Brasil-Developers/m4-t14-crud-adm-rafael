import { Response, Request } from "express";
import { CreatUserServices } from "../services/users/CreatUsers.service";
import { IUserRequest, IUserWithoutPassword } from "../interfaces";
import { ListAllUSersService } from "../services/users/listallUsers.service";
import { seachUserProfile } from "../services/users/seachUserProfile.service";
import { creatUserSchemaEdit } from "../Schema/user.schema";
import { deleteUserService } from "../services/users/deleteUser.service";
import { editUsersService } from "../services/users/editUser.service";
import { AppError } from "../erros";
import { reactivatingUserService } from "../services/users/reactivatingUser.service";

const CreatUsers = async (req: Request, res: Response): Promise<Response> => {
  const useData: IUserRequest = req.body;

  const newUser = await CreatUserServices(useData);

  return res.status(201).json(newUser);
};

const listAllUSers = async (req: Request, res: Response): Promise<Response> => {
  if (!req.user.typeUser) {
    return res.status(403).json({
      message: "Insufficient Permission",
    });
  }

  const UsersList: Array<IUserWithoutPassword> = await ListAllUSersService();

  return res.status(200).json(UsersList);
};

const checkUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = req.user.idUser;

  const user: IUserWithoutPassword = await seachUserProfile(id);

  return res.status(200).json(user);
};

const editUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = creatUserSchemaEdit.parse(req.body);
  const id: number = Number(req.params.id);

  if (id !== req.user.idUser && !req.user.typeUser) {
    throw new AppError("Insufficient Permission", 403);
  }
  const userEdit = await editUsersService(id, data, req.user.typeUser);

  return res.status(200).json(userEdit);
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  if (id !== req.user.idUser && !req.user.typeUser) {
    throw new AppError("Insufficient Permission", 403);
  }

  deleteUserService(id);

  return res.status(201).send();
};

const reactivatingUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  if (!req.user.typeUser) {
    throw new AppError("Insufficient Permission", 403);
  }

  if (req.userIdParams) {
    throw new AppError("User already active", 403);
  }

  const user = await reactivatingUserService(id);

  return res.status(200).json(user);
};

export {
  CreatUsers,
  listAllUSers,
  checkUserProfile,
  editUserControllers,
  deleteUser,
  reactivatingUser,
};
