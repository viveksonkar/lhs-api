import GoogleAuthService from "@/services/googleAuthService";
import { Controller, Get, Redirect, Req, Res, UseBefore, } from "routing-controllers";
import passport from 'passport';
import { Request, Response } from 'express';

@Controller() 
export class GoogleAuthController {


    public _gAuth = new GoogleAuthService();

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

