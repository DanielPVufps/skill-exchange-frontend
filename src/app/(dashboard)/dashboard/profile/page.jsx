"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import api from "@/lib/api"

function getInitials(firstName, lastName) {
  const f = firstName?.[0] ?? ""
  const l = lastName?.[0] ?? ""
  return (f + l).toUpperCase()
}

function formatDate(dateStr) {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/users/me/")
        setUser(response.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Datos de respaldo con tu info real
  const displayUser = user ?? {
    first_name: "Daniel",
    last_name: "Alejandro Pacheco Villamizar",
    email: "danielalejandropv@ufps.edu.co",
    date_joined: new Date().toISOString(),
  }

  const initials = getInitials(
    displayUser.first_name,
    displayUser.last_name
  )

  const fullName = [displayUser.first_name, displayUser.last_name]
    .filter(Boolean)
    .join(" ")

  const joinDate = formatDate(
    displayUser.date_joined ?? displayUser.created_at ?? null
  )

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "160px",
          color: "#94a3b8",
          fontSize: "14px",
        }}
      >
        Cargando...
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* TÍTULO */}
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#1e293b",
          margin: 0,
        }}
      >
        Usuarios
      </h1>

      {/* BUSCADOR */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "8px 14px",
          width: "280px",
        }}
      >
        <Search size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
        <input
          placeholder="Buscar por nombre o email..."
          readOnly
          style={{
            border: "none",
            outline: "none",
            fontSize: "13px",
            color: "#94a3b8",
            backgroundColor: "transparent",
            width: "100%",
          }}
        />
      </div>

      {/* TABLA */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Cabecera */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 200px",
            padding: "12px 20px",
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          {["Usuario", "Email", "Fecha de ingreso"].map((col) => (
            <span
              key={col}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#64748b",
                letterSpacing: "0.03em",
              }}
            >
              {col}
            </span>
          ))}
        </div>

        {/* Fila del usuario */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 200px",
            padding: "16px 20px",
            alignItems: "center",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          {/* Columna Usuario */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                backgroundColor: "#dbeafe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: "#1d4ed8",
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1e293b",
              }}
            >
              {fullName}
            </span>
          </div>

          {/* Columna Email */}
          <span
            style={{
              fontSize: "13px",
              color: "#3b82f6",
            }}
          >
            {displayUser.email}
          </span>

          {/* Columna Fecha */}
          <span
            style={{
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            {joinDate}
          </span>
        </div>
      </div>
    </div>
  )
}