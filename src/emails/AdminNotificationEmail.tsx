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
        <Container style={container}>
          <Heading style={h1}>Nuevo mensaje de contacto</Heading>
          <Text style={meta}>Recibido: {receivedAt}</Text>
          <Section style={card}>
            <Text style={label}>
              <strong>Nombre:</strong> {fullName}
            </Text>
            <Text style={label}>
              <strong>Teléfono:</strong> {phone}
            </Text>
            <Text style={label}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={label}>
              <strong>Asunto:</strong> {subject}
            </Text>
            <Hr style={hr} />
            <Text style={label}>
              <strong>Mensaje:</strong>
            </Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>
          <Text style={footer}>
            Este correo se envió automáticamente desde el sitio web AR Company.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#f6f8fa",
  fontFamily: "Arial, sans-serif",
  padding: "24px 0",
};
const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "32px",
  margin: "0 auto",
  width: "100%",
  maxWidth: "620px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};
const h1: React.CSSProperties = {
  color: "#111827",
  fontSize: "22px",
  margin: "0 0 8px",
};
const meta: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "0 0 16px",
};
const card: React.CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "16px",
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
  borderRadius: "6px",
  padding: "12px",
  fontSize: "14px",
  lineHeight: "20px",
  color: "#374151",
};
const footer: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "11px",
  marginTop: "24px",
};
const hr: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "12px 0 16px",
};

export default AdminNotificationEmail;
