"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

const NAV = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/skills", label: "Skills" },
  { href: "/dashboard/profile", label: "Usuarios" },
  { href: "/dashboard/goals", label: "Metas" },
]

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) router.replace("/login")
  }, [router])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    router.push("/")
  }

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh" }}>
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "0 28px",
          height: "52px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        {/* IZQUIERDA: logo + nav desktop */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b" }}>
            Skill Exchange
          </span>

          {!isMobile && (
            <nav style={{ display: "flex", gap: "4px" }}>
              {NAV.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: 500,
                      backgroundColor: active ? "#dbeafe" : "transparent",
                      color: active ? "#1d4ed8" : "#64748b",
                      transition: "background 0.15s",
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          )}
        </div>

        {/* DERECHA */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Cerrar sesión solo desktop */}
          {!isMobile && (
            <button
              onClick={logout}
              style={{
                border: "1px solid #e2e8f0",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#475569",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </button>
          )}

          {/* Hamburguesa solo mobile */}
          {isMobile && (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                style={{
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  backgroundColor: "transparent",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: 0,
                }}
                aria-label="Abrir menú"
              >
                {menuOpen ? (
                  <>
                    <span
                      style={{
                        display: "block",
                        width: "18px",
                        height: "2px",
                        backgroundColor: "#475569",
                        borderRadius: "2px",
                        transform: "rotate(45deg) translate(5px, 5px)",
                        transition: "all 0.2s",
                      }}
                    />
                    <span
                      style={{
                        display: "block",
                        width: "18px",
                        height: "2px",
                        backgroundColor: "#475569",
                        borderRadius: "2px",
                        opacity: 0,
                      }}
                    />
                    <span
                      style={{
                        display: "block",
                        width: "18px",
                        height: "2px",
                        backgroundColor: "#475569",
                        borderRadius: "2px",
                        transform: "rotate(-45deg) translate(5px, -5px)",
                        transition: "all 0.2s",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        display: "block",
                        width: "18px",
                        height: "2px",
                        backgroundColor: "#475569",
                        borderRadius: "2px",
                      }}
                    />
                    <span
                      style={{
                        display: "block",
                        width: "18px",
                        height: "2px",
                        backgroundColor: "#475569",
                        borderRadius: "2px",
                      }}
                    />
                    <span
                      style={{
                        display: "block",
                        width: "18px",
                        height: "2px",
                        backgroundColor: "#475569",
                        borderRadius: "2px",
                      }}
                    />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MENÚ MOBILE DESPLEGABLE */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "52px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40,
          }}
        >
          {/* Overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.15)",
            }}
          />

          {/* Panel flotante esquina superior derecha */}
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "16px",
              width: "200px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 24px rgba(15,23,42,0.12)",
              padding: "6px",
              zIndex: 1,
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {NAV.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: active ? 600 : 400,
                      backgroundColor: active ? "#dbeafe" : "transparent",
                      color: active ? "#1d4ed8" : "#1e293b",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                backgroundColor: "#f1f5f9",
                margin: "6px 0",
              }}
            />

            {/* Cerrar sesión */}
            <button
              onClick={logout}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "transparent",
                color: "#1e293b",
                fontSize: "14px",
                fontWeight: 400,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <main
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "16px" : "24px",
        }}
      >
        {children}
      </main>
    </div>
  )
}