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
  subject: string;
}

export function UserConfirmationEmail({ fullName, subject }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Hemos recibido tu solicitud</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>¡Gracias por contactarnos!</Heading>
          <Section style={card}>
            <Text style={p}>Hola {fullName.split(" ")[0] || fullName},</Text>
            <Text style={p}>
              Tu solicitud con el asunto <strong>{subject}</strong> ha sido
              recibida correctamente.
            </Text>
            <Text style={p}>
              Uno de nuestros asesores revisará tu mensaje y te responderá lo
              antes posible.
            </Text>
            <Text style={pSmall}>
              Si necesitas agregar información adicional, responde directamente
              a este correo.
            </Text>
            <Hr style={hr} />
            <Text style={signature}>
              Equipo AR Company
              <br />
              Asesoría Jurídica Integral
            </Text>
          </Section>
          <Text style={footer}>
            Este mensaje es una confirmación automática. No compartas
            información sensible si no estás seguro del destinatario.
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
  margin: "0 0 16px",
};
const card: React.CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "16px",
};
const p: React.CSSProperties = {
  color: "#111827",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 12px",
};
const pSmall: React.CSSProperties = {
  color: "#374151",
  fontSize: "13px",
  lineHeight: "19px",
  margin: "0 0 12px",
};
const signature: React.CSSProperties = {
  color: "#111827",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "8px 0 0",
};
const footer: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "11px",
  marginTop: "24px",
};
const hr: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "16px 0",
};

export default UserConfirmationEmail;
