import GoogleAuthService from "@/services/googleAuthService";
import { Controller, Get, Redirect, Req, Res, UseBefore, } from "routing-controllers";
import express from 'express';
import { Router } from 'express'
import passport from 'passport';
import { Request, Response } from 'express';
import errorMiddleware from "@/middlewares/error.middleware";
import passportMiddleWare from "@/passport-setup";
import authMiddleware from "@/middlewares/auth.middleware";

@Controller() 
export class GoogleAuthController {


    public _gAuth = new GoogleAuthService();
     router = Router();

    @Get('/auth/google')
     async googleLogIn(@Req() req: Request, @Res() res: Response) {
        this._gAuth.initializeGoogleStratergy()
         passport.authenticate('google', { scope: ['profile', 'email'] },)
    }

    @Get('/auth/google/callback')
  /*   @Redirect('http://localhost:4200/subscription') */
    async googleCallback(@Req() req: Request, @Res() res: Response) {
        const user = await this._gAuth.authenticateWithGoogle(req, res);
        console.log(user);
    }
}

