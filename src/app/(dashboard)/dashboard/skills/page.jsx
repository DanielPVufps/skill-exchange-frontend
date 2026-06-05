"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Search,
  Code2,
  Palette,
  MessageSquare,
  Users,
  Briefcase,
  Sprout,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { skillsService } from "@/services/skills.service"

const CATEGORIES = [
  { key: "all", label: "All", icon: MoreHorizontal },
  { key: "technical", label: "Technical", icon: Code2 },
  { key: "creative", label: "Creative", icon: Palette },
  { key: "communication", label: "Communication", icon: MessageSquare },
  { key: "leadership", label: "Leadership", icon: Users },
  { key: "business", label: "Business", icon: Briefcase },
  { key: "personal_development", label: "Personal development", icon: Sprout },
]

const PAGE_SIZE = 3

const categoryMap = {
  technical: "Technical",
  creative: "Creative",
  communication: "Communication",
  leadership: "Leadership",
  business: "Business",
  personal_development: "Personal development",
}

function LevelBadge({ level }) {
  const configs = {
    beginner: { bg: "#dcfce7", color: "#16a34a" },
    intermediate: { bg: "#dbeafe", color: "#1d4ed8" },
    advanced: { bg: "#ffedd5", color: "#ea580c" },
  }
  const cfg = configs[level] ?? { bg: "#f1f5f9", color: "#64748b" }
  const label = level ? level.charAt(0).toUpperCase() + level.slice(1) : "—"

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 12px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 600,
        backgroundColor: cfg.bg,
        color: cfg.color,
      }}
    >
      {label}
    </span>
  )
}

export default function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await skillsService.getAllSkills()
        setSkills(response.data.results || response.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let data = [...skills]
    if (search) {
      const q = search.toLowerCase()
      data = data.filter((s) => s.name.toLowerCase().includes(q))
    }
    if (category !== "all") {
      data = data.filter((s) => s.category === category)
    }
    return data
  }, [skills, search, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const start = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const end = Math.min(page * PAGE_SIZE, filtered.length)

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
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
        Skills
      </h1>

      {/* CATEGORÍAS */}
      <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "4px" }}>
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const active = category === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => { setCategory(cat.key); setPage(1) }}
              style={{
                minWidth: "110px",
                height: "85px",
                borderRadius: "12px",
                border: active ? "1.5px solid #93c5fd" : "1px solid #e2e8f0",
                backgroundColor: active ? "#eff6ff" : "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                flexShrink: 0,
                cursor: "pointer",
                color: active ? "#1d4ed8" : "#64748b",
                fontSize: "12px",
                fontWeight: 500,
                transition: "all 0.15s",
              }}
            >
              <Icon size={20} />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* BÚSQUEDA + ORDEN */}
      <div style={{ display: "flex", gap: "12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "8px 12px",
            flex: 1,
          }}
        >
          <Search size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
          <input
            placeholder="Buscar skills..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "13px",
              color: "#1e293b",
              backgroundColor: "transparent",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "8px 14px",
            fontSize: "13px",
            color: "#475569",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          Nombre A–Z
          <ChevronRight size={14} color="#94a3b8" style={{ transform: "rotate(90deg)" }} />
        </div>
      </div>

      {/* CARDS GRID */}
      {current.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 0",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          No se encontraron skills.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {current.map((skill) => (
            <Link
              key={skill.id}
              href={`/dashboard/skills/${skill.id}`}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "20px",
                textDecoration: "none",
                display: "block",
                transition: "box-shadow 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h2
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  {skill.name}
                </h2>
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                  {categoryMap[skill.category] ?? skill.category}
                </p>
                <div style={{ paddingTop: "4px" }}>
                  <LevelBadge level={skill.level} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* PAGINACIÓN */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "8px",
        }}
      >
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
          {start}–{end} de {filtered.length}
        </p>

        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
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
            <ChevronLeft size={15} color="#64748b" />
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
                transition: "all 0.15s",
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
            <ChevronRight size={15} color="#64748b" />
          </button>
        </div>
      </div>
    </div>
  )
}