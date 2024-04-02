import { STRIPE_CONFIG } from "@/models/stripe.config";
import Stripe from 'stripe';


class StripeService {
     private stripe: Stripe;

     constructor() {
        this.stripe = new Stripe(STRIPE_CONFIG.SECRET_KEY, {
            apiVersion: '2020-08-27',
         });
      }

      async createStripeSession(params: { priceId: string }) {
        try {
          const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              { price: params.priceId, quantity: 1 }
            ],
            mode: 'subscription',
            success_url: STRIPE_CONFIG.SUCCES_URL,
            cancel_url: STRIPE_CONFIG.CANCEL_URL
          });
          return session.id
          
        } catch (error) {
          console.error('Error creating Stripe session:', error);
        }

      }

}

export default StripeService