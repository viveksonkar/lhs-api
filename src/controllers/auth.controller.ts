import { Response } from 'express';
import { Controller, Req, Body, Post, UseBefore, HttpCode, Res, Put, Get } from 'routing-controllers';
//import { CreateUserDto } from '@/dtos/User.dto';
import { LoginUserDto } from '@/dtos/LoginUserDto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { validationMiddleware } from '@middlewares/validation.middleware';
import AuthService from '@services/auth.service';
import { CreateUserDto } from '@/dtos/user.dto';
import { SearcHandlerOptionDto, SearchOptionDto } from '@/dtos/search-option.dto';


@Controller()
export class AuthController {

    public authService = new AuthService();

    @Post('/login')
    @UseBefore(validationMiddleware(LoginUserDto, 'body'))
    async logIn(@Res() res: Response, @Body() userData: LoginUserDto) {
      const { findUser } = await this.authService.login(userData);
  
      // res.setHeader('Set-Cookie', [cookie]);
      return { data: findUser, message: 'login' };
    }

    @Post('/addUser')
    /* @UseBefore(authMiddleware) */
    @UseBefore(validationMiddleware(CreateUserDto, 'body'))
    async addHandler(@Body() createUserDto: CreateUserDto) {
      const addHandler: User = await this.authService.addHandler(createUserDto);
      return { data: addHandler, message:'Handler Added'}
    }

    @Post('/users')
     /* @UseBefore(authMiddleware) */
     @UseBefore(validationMiddleware(SearcHandlerOptionDto, 'body'))
     @HttpCode(200)
     async fetchHandlers(@Body() searchHandlerDto: SearcHandlerOptionDto ) {
        const findAllHandlers = await this.authService.getAllHAccessHandlers(searchHandlerDto)
        return { data: findAllHandlers, message: 'Handlers retrieved successfully' }
     }
     
    
}