'use server';
import {
  getVerificationTokenByEmailService,
  registerUserService,
} from '@/backend/services/authenticationService';
import { env } from '@/config/env';
import { baseAction } from '@/lib/zsa-procedures';
// import { redirect } from 'next/navigation';
import { SignUpInputSchema } from './sign-up.schema';
// import { toast } from 'sonner';

export const signUpAction = baseAction
  .input(SignUpInputSchema)
  .handler(async ({ input }) => {
    await registerUserService(input.email, input.password);

    const token = await getVerificationTokenByEmailService(input.email);

    return {
      message: 'Verify your email here',
      emailLink: `${env.HOST_NAME}/api/sign-in/verify-email?token=${token}`,
    };
  });