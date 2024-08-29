import { z } from 'zod';

const VALIDATIONS_MESSAGES = {
    required: (field: string) => `${field} is required`,
    string: (field: string) => `${field} must be a string`,
    email: 'Invalid email address',
    password: 'Password must be at least 6 characters',
    passwordNotMatch: 'The passwords did not match',
};

export const ForgotPasswordSchema = z.object({
    email: z
        .string({
            required_error: VALIDATIONS_MESSAGES.required('Email'),
            message: VALIDATIONS_MESSAGES.string('Email'),
        })
        .email({
            message: VALIDATIONS_MESSAGES.email,
        }),
});

export const VerificationEmailSchema = ForgotPasswordSchema;