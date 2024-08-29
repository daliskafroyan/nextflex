'use server';
import { getVerificationTokenByEmailService } from '@/backend/services/authenticationService';
import { env } from '@/config/env';
import { baseAction } from '@/lib/zsa-procedures';
import { VerificationEmailSchema } from './email-verification.schema';

export const getVerificationTokenAction = baseAction
  .input(VerificationEmailSchema)
  .handler(async ({ input }) => {
    const token = await getVerificationTokenByEmailService(input.email);

    return {
      message: 'Verification token has been sent to your email',
    };
  });