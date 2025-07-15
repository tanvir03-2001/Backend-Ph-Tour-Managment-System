/* eslint-disable no-console */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import {
  IAuthProvider,
  IsActive,
  IUser,
  Role,
} from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist");
      return;
    }

    console.log("Trying to create Super Admin...");

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    if (!hashedPassword) {
      throw new AppError(httpStatus.BAD_REQUEST, "Password Hashed Error");
    }

    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    const payload: IUser = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      isActive: IsActive.ACTIVE,
      auths: [authProvider],
    };

    const superAdmin = await User.create(payload);
    console.log("Super Admin create successfully! \n");
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};
