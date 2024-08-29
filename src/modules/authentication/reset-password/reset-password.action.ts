'use server';

import { changePasswordService } from '@/backend/services/authenticationService';
import { baseAction } from '@/lib/zsa-procedures';
import { ResetPasswordSchema } from './reset-password.schema';

export const resetPasswordAction = baseAction
  .input(ResetPasswordSchema)
  .handler(async ({ input }) => {
    await changePasswordService(input.password, input.token);
  });
