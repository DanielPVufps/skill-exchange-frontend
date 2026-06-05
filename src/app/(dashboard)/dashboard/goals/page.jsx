"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, BookOpen, Calendar } from "lucide-react"
import api from "@/lib/api"

const PAGE_SIZE = 6

function AchievedBadge({ achieved }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
        backgroundColor: achieved ? "#dcfce7" : "#fef3c7",
        color: achieved ? "#16a34a" : "#d97706",
        border: `1px solid ${achieved ? "#bbf7d0" : "#fde68a"}`,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: "13px" }}>{achieved ? "✓" : "○"}</span>
      {achieved ? "Alcanzada" : "Pendiente"}
    </div>
  )
}

function ProgressBar({ current, target }) {
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "#64748b",
          marginBottom: "6px",
          fontWeight: 500,
        }}
      >
        <span>Progreso</span>
        <span>
          {Number(current).toFixed(2)} / {Number(target).toFixed(2)} ({pct}%)
        </span>
      </div>
      <div
        style={{
          height: "7px",
          borderRadius: "999px",
          backgroundColor: "#e2e8f0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: "999px",
            backgroundColor: "#22c55e",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  )
}

function GoalCard({ goal }) {
  const skillName =
    goal.skill_name ||
    goal.skill?.name ||
    goal.related_skill ||
    "—"

  const deadline = goal.deadline || goal.due_date || goal.limit_date || null
  const deadlineLabel = deadline
    ? new Date(deadline).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
      })
    : null

  const current = parseFloat(goal.current_progress ?? goal.progress ?? 0)
  const target = parseFloat(goal.target ?? goal.goal_value ?? 1)

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Header: título + badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: 700,
            color: "#1e293b",
            lineHeight: 1.3,
          }}
        >
          {goal.title}
        </h2>
        <AchievedBadge achieved={goal.achieved} />
      </div>

      {/* Skill vinculada */}
      <p
        style={{
          margin: 0,
          fontSize: "12px",
          color: "#64748b",
        }}
      >
        <span style={{ fontWeight: 600 }}>Skill vinculada: </span>
        {skillName}
      </p>

      {/* Barra de progreso */}
      <ProgressBar current={current} target={target} />

      {/* Fecha límite */}
      {deadlineLabel && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          <Calendar size={13} color="#94a3b8" />
          <span>Límite: {deadlineLabel}</span>
        </div>
      )}
    </div>
  )
}

export default function GoalsPage() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/goals/")
        setGoals(response.data.results || response.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    if (!search) return goals
    const q = search.toLowerCase()
    return goals.filter((g) => g.title?.toLowerCase().includes(q))
  }, [goals, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

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
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* ENCABEZADO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#1e293b" }}>
            Metas de Aprendizaje
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#64748b" }}>
            Establece objetivos de estudio, mide tu progreso y alcanza tus metas.
          </p>
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1.5px solid #bfdbfe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <BookOpen size={18} color="#3b82f6" />
        </div>
      </div>

      {/* BÚSQUEDA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "10px 14px",
        }}
      >
        <Search size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
        <input
          placeholder="Buscar metas..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: "13px",
            color: "#1e293b",
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* GRID DE CARDS */}
      {current.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 0",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          No se encontraron metas.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "16px",
          }}
        >
          {current.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>
            Página {page} de {totalPages}
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                cursor: page === 1 ? "not-allowed" : "pointer",
                opacity: page === 1 ? 0.4 : 1,
              }}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  border: page === i + 1 ? "none" : "1px solid #e2e8f0",
                  backgroundColor: page === i + 1 ? "#1e293b" : "#ffffff",
                  color: page === i + 1 ? "#ffffff" : "#475569",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => page < totalPages && setPage(page + 1)}
              disabled={page === totalPages}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                cursor: page === totalPages ? "not-allowed" : "pointer",
                opacity: page === totalPages ? 0.4 : 1,
              }}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}