import {User, UserModel} from '../models/userModel';

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
    try {
      return UserModel.find({}).exec();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
