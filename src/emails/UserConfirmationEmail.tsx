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
  subject: string;
}

export function UserConfirmationEmail({ fullName, subject }: Props) {
  const firstName = (fullName || "").trim().split(" ")[0] || fullName;
  return (
    <Html>
      <Head />
      <Preview>AR Company — Hemos recibido tu solicitud</Preview>
      <Body style={body}>
        <div style={accentBar} />
        <Container style={container}>
          <Section style={header}>
            <div style={logoWrap}>
              <Img
                src="https://www.arcompanyjuridicos.com/images/Logo%20AR%20COMPANY.png"
                alt="AR Company"
                width={64}
                height={64}
                style={logo}
              />
              <div style={brandTextWrap}>
                <Text style={brandTitle}>AR Company</Text>
                <Text style={brandSubtitle}>Asesoría Jurídica Integral</Text>
              </div>
            </div>
          </Section>

          <Heading style={h1}>¡Gracias por contactarnos!</Heading>

          <Section style={card}>
            <Text style={p}>Hola {firstName},</Text>
            <Text style={p}>
              Tu solicitud con el asunto <strong style={strong}>{subject}</strong> ha sido recibida
              correctamente.
            </Text>
            <Text style={p}>
              Uno de nuestros asesores revisará tu mensaje y te responderá lo antes posible.
            </Text>
            <Text style={pSmall}>
              Si necesitas agregar información adicional, responde directamente a este correo.
            </Text>

            <Hr style={hr} />

            <div style={ctaWrap}>
              <a
                href="https://www.arcompanyjuridicos.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                style={ctaButton}
              >
                Ver estado o enviar más detalles
              </a>
            </div>

            <Text style={signature}>
              Equipo AR Company
              <br />
              Asesoría Jurídica Integral
            </Text>
          </Section>

          <Section style={infoCard}>
            <Text style={infoTitle}>Contacto</Text>
            <Text style={infoRow}>
              <span style={infoLabel}>Teléfono:</span> 323 289 5945 · 316 225 7289
            </Text>
            <Text style={infoRow}>
              <span style={infoLabel}>Email:</span> arcompanybienesyservicios@gmail.com
            </Text>
            <Text style={infoRow}>
              <span style={infoLabel}>Dirección:</span> Carrera 4 No. 10-38 oficina 201 Edificio Vela
            </Text>
          </Section>

          <Text style={footer}>
            Este mensaje es una confirmación automática. No compartas información sensible si no estás seguro del destinatario.
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
  borderRadius: "12px",
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
const brandSubtitle: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "13px",
  margin: 0,
};
const h1: React.CSSProperties = {
  color: "#111827",
  fontSize: "22px",
  margin: "16px 0",
};
const card: React.CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "20px",
};
const p: React.CSSProperties = {
  color: "#111827",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 12px",
};
const strong: React.CSSProperties = {
  color: "#b45309",
  fontWeight: 700,
};
const pSmall: React.CSSProperties = {
  color: "#374151",
  fontSize: "13px",
  lineHeight: "19px",
  margin: "0 0 12px",
};
const ctaWrap: React.CSSProperties = {
  margin: "16px 0 8px",
  textAlign: "left",
};
const ctaButton: React.CSSProperties = {
  display: "inline-block",
  background: "linear-gradient(90deg, #F59E0B, #FBBF24)",
  color: "#111827",
  fontWeight: 700,
  fontSize: "14px",
  textDecoration: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #f59e0b",
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
  marginTop: "18px",
};
const hr: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "14px 0",
};
const infoCard: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "16px",
  marginTop: "18px",
};
const infoTitle: React.CSSProperties = {
  color: "#111827",
  fontSize: "14px",
  fontWeight: 700,
  margin: "0 0 8px",
};
const infoRow: React.CSSProperties = {
  color: "#374151",
  fontSize: "13px",
  margin: "0 0 6px",
};
const infoLabel: React.CSSProperties = {
  color: "#b45309",
  fontWeight: 600,
};
const bottomGlow: React.CSSProperties = {
  width: "100%",
  height: "10px",
  background:
    "linear-gradient(90deg, rgba(245,158,11,0.25), rgba(251,191,36,0.25))",
};

export default UserConfirmationEmail;
