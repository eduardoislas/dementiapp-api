import {Request, Response} from 'express';
import {UserDao} from '../db/userDao';
import {getLogger} from "../clients/logger";
import {initThread} from "../services/assistantServices";

const userDao = new UserDao();

export const getUserByUsername = async (req: Request, res: Response) => {
    const logger = getLogger();
    const {username} = req.query;
    if (typeof username !== 'string') {
        return res.status(400).json({message: 'Username is required and must be a string'});
    }
    try {
        const user = await userDao.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        logger.info(`User found: ${user.username}`);
        res.status(200).json(user);
    } catch (error) {
        logger.error(`Error fetching user: ${error}`);
        res.status(500).json({message: 'Internal server error'});
    }
};

export const validateUser = async (req: Request, res: Response) => {
    const logger = getLogger();
    const user = req.body;
    if (!user || !user.username) {
        return res.status(400).json({message: 'Username is required'});
    }
    try {
        const existingUser = await userDao.getUserByUsername(user.username);
        if (!existingUser) {
            const threadId = await initThread();
            user.threadId = threadId;
            const newUser = await userDao.createUser(user);
            logger.info(`Nuevo usuario creado: ${newUser.username}`);
            return res.status(201).json(newUser);
        }
        logger.info(`Usuario encontrado: ${user.username}`);
        return res.status(200).json(existingUser);
    } catch (error) {
        logger.error(`Error validando usuario: ${error}`);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userDao.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
};
