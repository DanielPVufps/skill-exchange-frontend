"use client"

import Link from "next/link"

const FEATURES = [
  {
    icon: "≡",
    title: "Categorías organizadas",
    desc: "Técnicas, creativas, de comunicación, liderazgo y más. Todo clasificado para que encuentres rápido.",
  },
  {
    icon: "📖",
    title: "Detalle de cada skill",
    desc: "Nivel, descripción, habilidades relacionadas y perfil del autor en cada skill.",
  },
  {
    icon: "👥",
    title: "Comunidad activa",
    desc: "Explora los perfiles de otros usuarios, sus habilidades y sus logros.",
  },
]

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >
        {/* ── HEADER ── */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 28px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#1e293b",
            }}
          >
            Skill Exchange
          </span>

          <Link
            href="/login"
            style={{
              backgroundColor: "#0f172a",
              color: "#ffffff",
              padding: "9px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Iniciar sesión
          </Link>
        </header>

        {/* ── HERO ── */}
        <section
          style={{
            padding: "80px 24px 90px",
            textAlign: "center",
            backgroundColor: "#f8fafc",
          }}
        >
          {/* Pill badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 14px",
              backgroundColor: "#e0f2fe",
              border: "1px solid #bae6fd",
              borderRadius: "999px",
              fontSize: "12px",
              color: "#0369a1",
              fontWeight: 500,
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#0369a1",
                display: "inline-block",
              }}
            />
            Plataforma académica · Open API
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 58px)",
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 auto 24px",
              maxWidth: "600px",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Descubre y comparte{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#3b82f6",
                textDecorationThickness: "3px",
                textUnderlineOffset: "5px",
              }}
            >
              habilidades
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              margin: "0 auto 36px",
              maxWidth: "480px",
              fontSize: "15px",
              color: "#64748b",
              lineHeight: 1.7,
            }}
          >
            Skills Exchange es la plataforma donde el conocimiento se convierte
            en conexión. Explora cientos de habilidades, filtra por categoría y
            encuentra lo que necesitas.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/login"
              style={{
                backgroundColor: "#0f172a",
                color: "#ffffff",
                padding: "11px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Empezar ahora →
            </Link>

            <Link
              href="/login"
              style={{
                backgroundColor: "#ffffff",
                color: "#0f172a",
                padding: "11px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
                border: "1px solid #e2e8f0",
              }}
            >
              Ver skills
            </Link>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section
          style={{
            padding: "60px 40px",
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: 700,
              color: "#1e293b",
              margin: "0 0 36px",
            }}
          >
            Todo lo que necesitas en un solo lugar
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "28px 24px",
                  backgroundColor: "#ffffff",
                }}
              >
                {/* Icon box */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    marginBottom: "16px",
                  }}
                >
                  {f.icon}
                </div>

                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1e293b",
                  }}
                >
                  {f.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}