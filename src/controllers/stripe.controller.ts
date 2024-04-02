import StripeService from "@/services/Stripe/stripe.service";
import { Body, Controller, Post } from "routing-controllers";

@Controller() 
export class StripeController {

    public stripeService = new StripeService();
    
    @Post('/pay')
    async createSession(@Body() priceId: any ) {
       const sessionId: any = await this.stripeService.createStripeSession(priceId);
       return { data: sessionId, message: 'Session created'}
    }
}