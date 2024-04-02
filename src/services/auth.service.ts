import * as bcrypt from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import express from 'express'; 
//import { CreateUserDto } from '@dtos/User.dto';
import { LoginUserDto } from '@/dtos/LoginUserDto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User, UserRole } from '@interfaces/user.interface';
import userModel from '@models/users.model';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '@/entity/user.entity';
import { isEmpty } from '@utils/util';
import { CreateUserDto } from '@/dtos/user.dto';
import { SearcHandlerOptionDto } from '@/dtos/search-option.dto';
import passport from 'passport'

class AuthService {

    public createToken(user: User): TokenData {
        const dataStoredInToken: DataStoredInToken = { id: user.id,email:user.email,roleType:user.roleType };
        const secretKey: string = config.get('secretKey');
        const expiresIn: number = 60 * 60 * 12;
    
        return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
      }

    public async login(userData: LoginUserDto): Promise<{ findUser: User }> {
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    
        const userRepo: Repository<UserEntity> = getRepository(UserEntity);
        const findUser: User = await userRepo.findOne({
          email: userData.email,
        });
        
        if (!findUser) throw new HttpException(409, `Your email ${userData.email} not found or not Verfied Yet`);
        // eslint-disable-next-line prettier/prettier
        /* if (findUser.roleType !== UserRole.ADMIN) {
          throw new HttpException(409, "User not Verfied Yet");
        } */
       /*  const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "You're password not matching"); */
       
        const tokenData = this.createToken(findUser);
        // const cookie = this.createCookie(tokenData);
        delete findUser.password
        findUser['token'] = tokenData.token;
    
        return { findUser };
      }

      public async addHandler(addHandler: CreateUserDto): Promise<User> {
        const userRepo: Repository<User> = getRepository(UserEntity)
        const findUser: User = await userRepo.findOne({
          where: { email: addHandler.email }
        })
        if(findUser) throw new HttpException(409, `This email is already in use`);
        const savedUser = await userRepo.save(addHandler)
        return savedUser;

      }

        public async getAllHAccessHandlers(searchHandlerDto: SearcHandlerOptionDto): Promise<User[]> {
          const userRepo: Repository<User> = getRepository(UserEntity)
          if (!searchHandlerDto.email && !searchHandlerDto.mobile) {
            const results: User[] = await userRepo.find({
              where: {
                roleType: 'HANDLER'
              }
            })
            return results
          }

          if(searchHandlerDto.email && !searchHandlerDto.mobile ) {
            const results: User[] = await userRepo.find({
              where: {
                roleType: 'HANDLER',
                email: searchHandlerDto.email
              }
            })
            return results
          }
          if(searchHandlerDto.mobile && !searchHandlerDto.email) {
            const results: User[] = await userRepo.find({
              where: {
                roleType: 'HANDLER',
                mobile: searchHandlerDto.mobile
              }
            })
            return results
          }
        }
    
}

export default AuthService