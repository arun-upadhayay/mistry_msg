import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";


interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  <Html lang="en" dir="ltr">
    <Head>
      <title>Verification code </title>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Here&apos; your verification code: {otp}</Preview>
    <Section>
      <Row>
        <Heading as="h2">Hello {username},</Heading>
      </Row>
      <Row>
        <Text>
          Thank you for registering. please ise the following verification code
          to complete your registration:
        </Text>
      </Row>
      <Row>
        <Text>
          <b>{otp}</b>
        </Text>
      </Row>
      <Row>
        <Text>If you did not register, please ignore this email.</Text>
      </Row>
      <Row>
        <Text>Thank you,</Text>
      </Row>
      {/* <Row>
        <Button
          href={`http://localhost:3000/verify/${username}`}
          style={{ color: "#61dafb" }}
        >
          Verify here
        </Button>
      </Row> */}
    </Section>
  </Html>;
}