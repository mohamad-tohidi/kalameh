"use client"

import { useEffect, useState } from "react"
import {
  ReactFlow,
  type Node,
  type Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

// Custom node for books
function BookNode({ data }: { data: { label: string } }) {
  return (
    <div className="relative group">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
      <div className="px-4 py-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg shadow-teal-200 border-2 border-teal-400 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-teal-300">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="text-white font-semibold text-sm whitespace-nowrap">{data.label}</span>
        </div>
      </div>
    </div>
  )
}

// Custom node for authors
function AuthorNode({ data }: { data: { label: string } }) {
  return (
    <div className="relative group">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
      <div className="px-4 py-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-200 border-2 border-blue-400 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-blue-300">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-white font-semibold text-sm whitespace-nowrap">{data.label}</span>
        </div>
      </div>
    </div>
  )
}

const nodeTypes = {
  book: BookNode,
  author: AuthorNode,
}

const initialNodes: Node[] = [
  // Books - top row
  { id: "kafi", type: "book", position: { x: 50, y: 50 }, data: { label: "الکافی" } },
  { id: "faqih", type: "book", position: { x: 250, y: 50 }, data: { label: "من لا یحضره الفقیه" } },
  { id: "tahdhib", type: "book", position: { x: 480, y: 50 }, data: { label: "تهذیب الأحکام" } },
  { id: "istibsar", type: "book", position: { x: 700, y: 50 }, data: { label: "الاستبصار" } },
  // Authors - bottom row
  { id: "kulayni", type: "author", position: { x: 50, y: 220 }, data: { label: "شیخ کلینی" } },
  { id: "saduq", type: "author", position: { x: 280, y: 220 }, data: { label: "شیخ صدوق" } },
  { id: "tusi", type: "author", position: { x: 550, y: 220 }, data: { label: "شیخ طوسی" } },
]

const initialEdges: Edge[] = [
  // Authorship relations (book -> author)
  {
    id: "e1",
    source: "kafi",
    target: "kulayni",
    label: "تألیف",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#0d9488", strokeWidth: 2 },
    labelStyle: { fill: "#0d9488", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "white", fillOpacity: 0.9 },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 4,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#0d9488" },
  },
  {
    id: "e2",
    source: "faqih",
    target: "saduq",
    label: "تألیف",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#0d9488", strokeWidth: 2 },
    labelStyle: { fill: "#0d9488", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "white", fillOpacity: 0.9 },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 4,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#0d9488" },
  },
  {
    id: "e3",
    source: "tahdhib",
    target: "tusi",
    label: "تألیف",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#0d9488", strokeWidth: 2 },
    labelStyle: { fill: "#0d9488", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "white", fillOpacity: 0.9 },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 4,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#0d9488" },
  },
  {
    id: "e4",
    source: "istibsar",
    target: "tusi",
    label: "تألیف",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#0d9488", strokeWidth: 2 },
    labelStyle: { fill: "#0d9488", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "white", fillOpacity: 0.9 },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 4,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#0d9488" },
  },
  // Teacher-student relations
  {
    id: "e5",
    source: "kulayni",
    target: "saduq",
    label: "استاد",
    type: "smoothstep",
    style: { stroke: "#f59e0b", strokeWidth: 2, strokeDasharray: "5,5" },
    labelStyle: { fill: "#f59e0b", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "white", fillOpacity: 0.9 },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 4,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f59e0b" },
  },
  // Hadith transmission
  {
    id: "e6",
    source: "saduq",
    target: "tusi",
    label: "نقل روایت",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 2, strokeDasharray: "5,5" },
    labelStyle: { fill: "#8b5cf6", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "white", fillOpacity: 0.9 },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 4,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
  },
]

export default function KnowledgeGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Animate nodes appearing one by one
    const nodeTimers: NodeJS.Timeout[] = []
    initialNodes.forEach((node, i) => {
      const timer = setTimeout(() => {
        setNodes((nds) => [...nds, node])
      }, i * 200)
      nodeTimers.push(timer)
    })

    // Animate edges appearing after nodes
    const edgeTimers: NodeJS.Timeout[] = []
    initialEdges.forEach((edge, i) => {
      const timer = setTimeout(
        () => {
          setEdges((eds) => [...eds, edge])
        },
        initialNodes.length * 200 + i * 300,
      )
      edgeTimers.push(timer)
    })

    return () => {
      nodeTimers.forEach(clearTimeout)
      edgeTimers.forEach(clearTimeout)
    }
  }, [setNodes, setEdges])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-400">در حال بارگذاری...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-left"
      >
        <Background color="#cbd5e1" gap={20} size={1} />
        <Controls className="bg-white rounded-lg shadow-lg border border-slate-200" />
        <MiniMap
          nodeColor={(node) => (node.type === "book" ? "#0d9488" : "#3b82f6")}
          className="bg-white rounded-lg shadow-lg border border-slate-200"
          maskColor="rgba(0,0,0,0.1)"
        />
      </ReactFlow>

      {/* Legend */}
      <div
        className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200 p-4"
        dir="rtl"
      >
        <h4 className="text-sm font-semibold text-slate-700 mb-3">راهنما</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-teal-500 to-teal-600" />
            <span className="text-xs text-slate-600">کتاب</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-blue-600" />
            <span className="text-xs text-slate-600">مؤلف</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-teal-500" />
            <span className="text-xs text-slate-600">تألیف</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-0.5 bg-amber-500"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #f59e0b, #f59e0b 4px, transparent 4px, transparent 8px)",
              }}
            />
            <span className="text-xs text-slate-600">استاد</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-0.5 bg-violet-500"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #8b5cf6, #8b5cf6 4px, transparent 4px, transparent 8px)",
              }}
            />
            <span className="text-xs text-slate-600">نقل روایت</span>
          </div>
        </div>
      </div>
    </div>
  )
}
