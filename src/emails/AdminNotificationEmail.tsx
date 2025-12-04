import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Img,
} from "@react-email/components";

interface Props {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}

export function AdminNotificationEmail(props: Props) {
  const { fullName, phone, email, subject, message, receivedAt } = props;
  return (
    <Html>
      <Head />
      <Preview>
        Nuevo contacto: {fullName} - {subject}
      </Preview>
      <Body style={body}>
        <div style={accentBar} />
        <Container style={container}>
          <Section style={header}>
            <div style={logoWrap}>
              <Img
                src="https://www.arcompanyjuridicos.com/images/Logo%20AR%20COMPANY.png"
                alt="AR Company"
                width={110}
                height={70}
                style={logo}
              />
              <div style={brandTextWrap}>
                <Text style={brandTitle}>AR Company</Text>
              </div>
            </div>
          </Section>

          <Heading style={h1}>Nuevo mensaje de contacto</Heading>
          <Text style={meta}>Recibido: {receivedAt}</Text>

          <Section style={card}>
            <Text style={label}><strong>Nombre:</strong> {fullName}</Text>
            <Text style={label}><strong>Teléfono:</strong> {phone}</Text>
            <Text style={label}><strong>Email:</strong> {email}</Text>
            <Text style={label}><strong>Asunto:</strong> {subject}</Text>

            <Hr style={hr} />

            <Text style={label}><strong>Mensaje:</strong></Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Text style={footerStrong}>
            Notificación automática del sitio web AR Company.
          </Text>
        </Container>
        <div style={bottomGlow} />
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
  padding: "0",
  margin: 0,
};
const accentBar: React.CSSProperties = {
  width: "100%",
  height: "6px",
  background: "linear-gradient(90deg, #F59E0B, #FBBF24)",
};
const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  margin: "24px auto",
  width: "100%",
  maxWidth: "640px",
  boxShadow: "0 12px 32px rgba(17, 24, 39, 0.08)",
  border: "1px solid #e5e7eb",
};
const header: React.CSSProperties = {
  paddingBottom: "8px",
  marginBottom: "16px",
  borderBottom: "1px solid #e5e7eb",
};
const logoWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};
const logo: React.CSSProperties = {
  display: "block",
};
const brandTextWrap: React.CSSProperties = {
  lineHeight: "1.3",
};
const brandTitle: React.CSSProperties = {
  color: "#111827",
  fontSize: "18px",
  fontWeight: 700,
  margin: 0,
};
const h1: React.CSSProperties = {
  color: "#111827",
  fontSize: "22px",
  margin: "16px 0",
};
const meta: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "0 0 16px",
};
const card: React.CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "20px",
};
const label: React.CSSProperties = {
  color: "#111827",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 8px",
};
const messageStyle: React.CSSProperties = {
  whiteSpace: "pre-wrap",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "12px",
  fontSize: "14px",
  lineHeight: "20px",
  color: "#374151",
};
const footerStrong: React.CSSProperties = {
  color: "#374151",
  fontSize: "12px",
  marginTop: "18px",
};
const hr: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "14px 0",
};
const bottomGlow: React.CSSProperties = {
  width: "100%",
  height: "10px",
  background:
    "linear-gradient(90deg, rgba(245,158,11,0.25), rgba(251,191,36,0.25))",
};

export default AdminNotificationEmail;
