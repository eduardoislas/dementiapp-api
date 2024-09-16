import {User, UserModel} from '../models/userModel';
import {getLogger} from "../clients/logger";

export class UserDao {
  constructor() {
  }

  async createUser(user: User): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser.toObject();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return UserModel.findOne({username});
  }

  async getAllUsers(): Promise<User[]> {
    const logger = getLogger();
    try {
      return UserModel.find({}).exec();
    } catch (error) {
      logger.error('Error fetching users:', error);
      throw error;
    }
  }
}
