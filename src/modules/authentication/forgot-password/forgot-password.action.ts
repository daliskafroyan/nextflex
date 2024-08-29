'use server';
import { forgotPasswordService } from '@/backend/services/authenticationService';
import { env } from '@/config/env';
import { baseAction } from '@/lib/zsa-procedures';
import { ForgotPasswordSchema } from './forgot-password.schema';

export const forgotPasswordAction = baseAction
  .input(ForgotPasswordSchema)
  .handler(async ({ input }) => {
    const token = await forgotPasswordService(input.email);
    return {
      message: 'Password reset token has been sent to your email',
      emailLink: `${env.HOST_NAME}/reset-password?token=${token}`,
    };
  });
