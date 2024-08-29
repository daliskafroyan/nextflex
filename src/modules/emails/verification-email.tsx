import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";
import { env } from '@/config/env';

interface VerificationEmailProps {
    validationCode?: string;
}

const baseUrl = env.HOST_NAME

export const VerificationEmail = ({
    validationCode,
}: VerificationEmailProps) => (
    <Html>
        <Head />
        <Preview>You&apos;re already verified!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={heading}>click the button below to login</Heading>
                <Section style={buttonContainer}>
                    <Button style={button} href={`${baseUrl}/api/sign-in/verify-email?token=${validationCode}`}>
                        Login to App
                    </Button>
                </Section>
                <Hr style={hr} />
                <Link href={`https://${baseUrl}`} style={reportLink}>
                    {baseUrl}
                </Link>
            </Container>
        </Body>
    </Html>
);

export default VerificationEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "560px",
};

const heading = {
    fontSize: "24px",
    letterSpacing: "-0.5px",
    lineHeight: "1.3",
    fontWeight: "400",
    color: "#484848",
    padding: "17px 0 0",
};

const buttonContainer = {
    padding: "27px 0 27px",
};

const button = {
    backgroundColor: "#5e6ad2",
    borderRadius: "3px",
    fontWeight: "600",
    color: "#fff",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "11px 23px",
};

const reportLink = {
    fontSize: "14px",
    color: "#b4becc",
};

const hr = {
    borderColor: "#dfe1e4",
    margin: "42px 0 26px",
};

const code = {
    fontFamily: "monospace",
    fontWeight: "700",
    padding: "1px 4px",
    backgroundColor: "#dfe1e4",
    letterSpacing: "-0.3px",
    fontSize: "21px",
    borderRadius: "4px",
    color: "#3c4149",
};
