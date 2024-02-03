import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '@/entity/user.entity';
import { User } from '@/interfaces/user.interface';


const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const userRepo: Repository<UserEntity> = getRepository(UserEntity);
      const findUser: User = await userRepo.findOne({
        "id": userId 
      });

      if (findUser) {
        delete findUser.password
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
