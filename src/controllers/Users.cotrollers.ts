import { Response, Request } from "express";
import { IUserRequest, IUserWithoutPassword } from "../interfaces";
import { creatUserSchemaEdit } from "../Schema/user.schema";
import { AppError } from "../erros";
import { CreatUserServices } from "../services/users/CreatUsers.service";
import { ListAllUSersService } from "../services/users/ListallUsers.service";
import { EditUsersService } from "../services/users/EditUser.service";
import { DeleteUserService } from "../services/users/DeleteUser.service";
import { ReactivatingUserService } from "../services/users/ReactivatingUser.service";
import SeachUserProfile from "../services/users/SeachUserProfile.service";

const CreatUsers = async (req: Request, res: Response): Promise<Response> => {
  const useData: IUserRequest = req.body;

  const newUser = await CreatUserServices(useData);

  return res.status(201).json(newUser);
};

const ListAllUSers = async (req: Request, res: Response): Promise<Response> => {
  const UsersList: Array<IUserWithoutPassword> = await ListAllUSersService();

  return res.status(200).json(UsersList);
};

const CheckUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = req.user.idUser;

  const user: IUserWithoutPassword = await SeachUserProfile(id);

  return res.status(200).json(user);
};

const EditUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = creatUserSchemaEdit.parse(req.body);
  const id: number = Number(req.params.id);

  const userEdit: IUserWithoutPassword = await EditUsersService(
    id,
    data,
    req.user.typeUser
  );

  return res.status(200).json(userEdit);
};

const DeleteUser = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  DeleteUserService(id);

  return res.status(201).send();
};

const ReactivatingUser = async (
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

  const user: IUserWithoutPassword = await ReactivatingUserService(id);

  return res.status(200).json(user);
};

export {
  CreatUsers,
  ListAllUSers,
  CheckUserProfile,
  EditUserControllers,
  DeleteUser,
  ReactivatingUser,
};
