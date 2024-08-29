import { Resend } from 'resend';
import VerificationEmail from '@/modules/emails/verification-email';
import { env } from '@/config/env';

// const resend = new Resend(env.RESEND_API_KEY);
const resend = new Resend('');


export async function POST(request: Request) {
    try {
        const { email, validationCode } = await request.json();

        if (!email || !validationCode) {
            return new Response(JSON.stringify({ error: 'Missing email or validationCode' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Apps Verification Email',
            react: VerificationEmail({ validationCode }),
        });

        if (response.error) {
            const { name, message } = response.error;
            let status: number;

            switch (name) {
                case 'missing_required_field':
                case 'invalid_access':
                case 'invalid_parameter':
                case 'invalid_region':
                    status = 422;
                    break;
                case 'rate_limit_exceeded':
                    status = 429;
                    break;
                case 'missing_api_key':
                    status = 401;
                    break;
                case 'invalid_api_Key':
                case 'invalid_from_address':
                case 'validation_error':
                    status = 403;
                    break;
                case 'not_found':
                    status = 404;
                    break;
                case 'method_not_allowed':
                    status = 405;
                    break;
                default:
                    status = 500;
            }

            return new Response(JSON.stringify(message), {
                status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Error sending email' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}