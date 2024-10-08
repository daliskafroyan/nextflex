import { z } from "zod";

const VALIDATIONS_MESSAGES = {
    required: (field: string) => `${field} is required`,
    string: (field: string) => `${field} must be a string`,
    email: 'Invalid email address',
    password: 'Password must be at least 6 characters',
    passwordNotMatch: 'The passwords did not match',
};

const PasswordsSchema = z.object({
    password: z
        .string({
            required_error: VALIDATIONS_MESSAGES.required('Password'),
            message: VALIDATIONS_MESSAGES.string('Password'),
        })
        .min(6, {
            message: VALIDATIONS_MESSAGES.password,
        }),
    confirmPassword: z.string().min(6),
});


const _ResetPasswordSchema = PasswordsSchema.merge(
    z.object({
        token: z.string({
            required_error: VALIDATIONS_MESSAGES.required('Token'),
            message: VALIDATIONS_MESSAGES.string('Token'),
        }),
    })
);

export const ResetPasswordSchema = _ResetPasswordSchema.superRefine(
    ({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: VALIDATIONS_MESSAGES.passwordNotMatch,
                path: ['confirmPassword'],
            });
        }
    }
);