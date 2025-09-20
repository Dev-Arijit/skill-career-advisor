import React, { useState, useRef } from "react";
import {
  Star,
  Monitor,
  Server,
  Paintbrush,
  Layers3,
  Smartphone,
  Cloud,
  Database,
  Megaphone,
  Briefcase,
  Settings,
  Brain,
  Crown,
} from "lucide-react";

// ---------------- Error Boundary ----------------
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
          <h2>Something went wrong. Check the console.</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  const [masteredSkills, setMasteredSkills] = useState(new Set(["foundation"]));
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [totalXP, setTotalXP] = useState(100);
  const svgRef = useRef(null);

  // ---------------- Skill Data ----------------
  const skillData = {
    foundation: {
      name: "Foundation",
      icon: Star,
      position: { x: 400, y: 500 },
      xp: 100,
      color: "#6366F1",
      description: "Your starting point - basic skills and knowledge",
      unlocks: ["frontend", "backend", "design"],
    },
    frontend: {
      name: "Frontend Development",
      icon: Monitor,
      position: { x: 200, y: 350 },
      xp: 250,
      color: "#22C55E",
      description: "Master React, Vue, and modern web technologies",
      unlocks: ["ui-ux", "mobile"],
    },
    backend: {
      name: "Backend Engineering",
      icon: Server,
      position: { x: 600, y: 350 },
      xp: 300,
      color: "#EF4444",
      description: "APIs, databases, and server architecture",
      unlocks: ["devops", "data"],
    },
    design: {
      name: "Design Systems",
      icon: Paintbrush,
      position: { x: 400, y: 250 },
      xp: 200,
      color: "#A855F7",
      description: "Visual design and user experience principles",
      unlocks: ["ui-ux", "branding"],
    },
    "ui-ux": {
      name: "UI/UX Mastery",
      icon: Layers3,
      position: { x: 250, y: 150 },
      xp: 350,
      color: "#FB923C",
      description: "Advanced user interface and experience design",
      unlocks: ["product"],
    },
    mobile: {
      name: "Mobile Development",
      icon: Smartphone,
      position: { x: 100, y: 200 },
      xp: 400,
      color: "#0EA5E9",
      description: "iOS, Android, and cross-platform development",
      unlocks: ["native"],
    },
    devops: {
      name: "DevOps & Cloud",
      icon: Cloud,
      position: { x: 700, y: 200 },
      xp: 450,
      color: "#10B981",
      description: "Infrastructure, CI/CD, and cloud platforms",
      unlocks: ["architecture"],
    },
    data: {
      name: "Data Engineering",
      icon: Database,
      position: { x: 550, y: 150 },
      xp: 500,
      color: "#F56565",
      description: "Big data, ML pipelines, and analytics",
      unlocks: ["ai-ml"],
    },
    branding: {
      name: "Brand Strategy",
      icon: Megaphone,
      position: { x: 450, y: 100 },
      xp: 300,
      color: "#8B5CF6",
      description: "Brand identity and marketing strategy",
      unlocks: ["product"],
    },
    product: {
      name: "Product Leadership",
      icon: Briefcase,
      position: { x: 350, y: 50 },
      xp: 600,
      color: "#FBBF24",
      description: "Product strategy and team leadership",
      unlocks: ["executive"],
    },
    native: {
      name: "Native Platforms",
      icon: Settings,
      position: { x: 50, y: 100 },
      xp: 550,
      color: "#3B82F6",
      description: "Platform-specific optimization and APIs",
      unlocks: [],
    },
    architecture: {
      name: "System Architecture",
      icon: Layers3,
      position: { x: 650, y: 50 },
      xp: 700,
      color: "#34D399",
      description: "Large-scale system design and architecture",
      unlocks: ["executive"],
    },
    "ai-ml": {
      name: "AI/ML Engineering",
      icon: Brain,
      position: { x: 550, y: 50 },
      xp: 800,
      color: "#EC4899",
      description: "Machine learning and artificial intelligence",
      unlocks: ["executive"],
    },
    executive: {
      name: "Executive Leadership",
      icon: Crown,
      position: { x: 400, y: 20 },
      xp: 1000,
      color: "#F59E0B",
      description: "C-level leadership and strategic vision",
      unlocks: [],
    },
  };

  // ---------------- Helpers ----------------
  const isSkillUnlocked = (skillKey) => {
    if (skillKey === "foundation") return true;
    return Object.entries(skillData).some(
      ([key, skill]) =>
        masteredSkills.has(key) && skill.unlocks.includes(skillKey)
    );
  };

  const getSkillStatus = (skillKey) => {
    if (masteredSkills.has(skillKey)) return "mastered";
    if (isSkillUnlocked(skillKey)) return "available";
    return "locked";
  };

  const masterSkill = (skillKey) => {
    if (isSkillUnlocked(skillKey) && !masteredSkills.has(skillKey)) {
      setMasteredSkills((prev) => new Set([...prev, skillKey]));
      setTotalXP((prev) => prev + skillData[skillKey].xp);
    }
  };

  const getConnectionPath = (skill1Key, skill2Key) => {
    const skill1 = skillData[skill1Key];
    const skill2 = skillData[skill2Key];
    if (!skill1 || !skill2) return "";
    return `M ${skill1.position.x} ${skill1.position.y} L ${skill2.position.x} ${skill2.position.y}`;
  };

  const renderConnections = () => {
    const connections = [];
    Object.entries(skillData).forEach(([key, skill]) => {
      skill.unlocks.forEach((unlockedSkill) => {
        const isActive = masteredSkills.has(key);
        const path = getConnectionPath(key, unlockedSkill);
        if (!path) return;
        connections.push(
          <path
            key={`${key}-${unlockedSkill}`}
            d={path}
            stroke={isActive ? skill.color : "rgba(100, 116, 139, 0.3)"}
            strokeWidth={isActive ? 3 : 1}
            fill="none"
            opacity={isActive ? 0.9 : 0.3}
            className="transition-all duration-500"
          />
        );
      });
    });
    return connections;
  };

  // ---------------- Render ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-900 p-8 flex">
      {/* ---------------- Main Skill Tree ---------------- */}
      <div className="flex-1 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            🌌 The Constellation
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            Watch your career map grow in real-time
          </p>
          <div className="flex justify-center items-center space-x-8">
            <div className="bg-slate-800/70 px-6 py-3 rounded-lg border border-slate-700 shadow-lg">
              <span className="text-sm text-gray-400">Total XP</span>
              <div className="text-3xl font-bold text-yellow-400">
                {totalXP.toLocaleString()}
              </div>
            </div>
            <div className="bg-slate-800/70 px-6 py-3 rounded-lg border border-slate-700 shadow-lg">
              <span className="text-sm text-gray-400">Skills Mastered</span>
              <div className="text-3xl font-bold text-green-400">
                {masteredSkills.size} / {Object.keys(skillData).length}
              </div>
            </div>
          </div>
        </div>

        {/* Skill Tree */}
        <div className="relative">
          <svg
            ref={svgRef}
            width="800"
            height="550"
            className="mx-auto bg-slate-900/30 rounded-xl border border-slate-700"
            style={{ filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.4))" }}
          >
            {/* Grid background */}
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(100, 116, 139, 0.1)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Connections */}
            <g className="connections">{renderConnections()}</g>

            {/* Skills */}
            <g className="skills">
              {Object.entries(skillData).map(([key, skill]) => {
                const status = getSkillStatus(key);
                const IconComponent = skill.icon;
                const isHovered = hoveredSkill === key;

                return (
                  <g key={key}>
                    {/* Glow for mastered */}
                    {status === "mastered" && (
                      <circle
                        cx={skill.position.x}
                        cy={skill.position.y}
                        r="35"
                        fill={skill.color}
                        opacity="0.25"
                        className="animate-pulse"
                      />
                    )}
                    {/* Node */}
                    <circle
  cx={skill.position.x}
  cy={skill.position.y}
  r="25"
  fill={status === "locked" ? "rgba(100,116,139,0.2)" : skill.color}
  stroke={status === "mastered" ? "#fff" : "rgba(255,255,255,0.3)"}
  strokeWidth={status === "mastered" ? 3 : 1}
  className="cursor-pointer transition-transform duration-300"
  onClick={(e) => {
    e.preventDefault(); // prevent default browser behavior
    e.stopPropagation(); // prevent any parent handlers
    masterSkill(key);
  }}
/>
<IconComponent
  x={skill.position.x - 12}
  y={skill.position.y - 12}
  className="w-5 h-5 text-white pointer-events-none"
/>

                    {/* Label */}
                    <text
                      x={skill.position.x}
                      y={skill.position.y + 45}
                      textAnchor="middle"
                      className="text-sm font-semibold fill-gray-200"
                    >
                      {skill.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Hover Details */}
          {hoveredSkill && (
            <div className="absolute top-4 left-4 bg-slate-800/95 p-6 rounded-lg border border-slate-700 max-w-xs backdrop-blur-sm shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: skillData[hoveredSkill].color }}
                >
                  {React.createElement(skillData[hoveredSkill].icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {skillData[hoveredSkill].name}
                </h3>
              </div>
              <p className="text-gray-200 text-sm mb-3">
                {skillData[hoveredSkill].description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 font-semibold">
                  +{skillData[hoveredSkill].xp} XP
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    getSkillStatus(hoveredSkill) === "mastered"
                      ? "bg-green-500/20 text-green-400"
                      : getSkillStatus(hoveredSkill) === "available"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-slate-500/20 text-slate-400"
                  }`}
                >
                  {getSkillStatus(hoveredSkill)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex justify-center mt-8 space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-300 text-sm">Mastered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-gray-300 text-sm">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-slate-500"></div>
            <span className="text-gray-300 text-sm">Locked</span>
          </div>
        </div>
      </div>

      {/* ---------------- All Skills Container ---------------- */}
<div className="w-72 h-[700px] overflow-y-auto p-6 bg-slate-800/90 rounded-xl border border-slate-700 shadow-lg">
  <h2 className="text-xl font-semibold text-white mb-4">Skills Progress</h2>
  {Object.entries(skillData).map(([key, skill]) => {
    const status = getSkillStatus(key);
    const percentage = masteredSkills.has(key)
      ? 100
      : isSkillUnlocked(key)
      ? 50
      : 0;

    // Color based on status
    let barColor = "bg-gray-500";
    if (status === "mastered") barColor = "bg-green-400";
    else if (status === "available") barColor = "bg-blue-400";

    return (
      <div key={key} className="mb-4">
        {/* Skill Name and Percentage */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-white font-medium">{skill.name}</span>
          <span className={`text-sm font-semibold ${status === "mastered" ? "text-green-400" : status === "available" ? "text-blue-400" : "text-gray-400"}`}>
            {percentage}%
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  })}
</div>

    </div>
  );
};

export default function WrappedApp() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
