import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [showRadar, setShowRadar] = useState(false);
  const [salaryValue, setSalaryValue] = useState(200000);
  const [activeFilters, setActiveFilters] = useState(['Reactjs']);
  const sweepRef = useRef(null);
  const animationRef = useRef(null);
  const angleRef = useRef(0);

  // Sample skill filter data
  const skillFilters = ['Reactjs', 'Crypt', 'Coyak', 'Dopdeat', 'Y6', 'YX', 'Seuchtdbn', 'XX'];

  // Radar markers data
  const markers = [
    {angle: 270, r: 0.95, label: "Software Dev", bigLabel: "P", color: "blue", detail: "Dals Skecipt"},
    {angle: 350, r: 0.55, label: "Software Dev", bigLabel: "S", color: "green"},
    {angle: 20, r: 0.55, label: "Javascript", bigLabel: "S", color: "green"},
    {angle: 40, r: 0.40, label: "Data Scientist @ BlsGen", bigLabel: "G", color: "green"},
    {angle: 75, r: 0.95, label: "Lead Engineer @ Tech Corp", bigLabel: "L", color: "blue"},
    {angle: 115, r: 0.65, label: "SQL", bigLabel: "O", color: "orange", detail: "Dalfinanicct"},
    {angle: 135, r: 0.40, label: "UI/UX Design", bigLabel: "R", color: "red"},
    {angle: 165, r: 0.38, label: "FinTech Analyst", bigLabel: "F", color: "red"},
  ];

  const addSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const startRadar = () => {
    setShowRadar(true);
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Radar animation logic
  const polarToCartesian = (cx, cy, radius, angleDegrees) => {
    const angleRadians = (angleDegrees - 90) * Math.PI / 180.0;
    return {
      x: cx + (radius * Math.cos(angleRadians)),
      y: cy + (radius * Math.sin(angleRadians))
    };
  };

  const createSweepPath = (cx, cy, radius, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, radius, endAngle);
    const end = polarToCartesian(cx, cy, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", cx, cy,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  useEffect(() => {
    if (showRadar && sweepRef.current) {
      const animate = () => {
        const cx = 230, cy = 230, radiusOuter = 215;
        const sweepWidth = 40;
        
        const angleEnd = (angleRef.current + sweepWidth) % 360;
        let path = '';
        
        if (angleEnd > angleRef.current) {
          path = createSweepPath(cx, cy, radiusOuter, angleRef.current, angleEnd);
        } else {
          path = [
            createSweepPath(cx, cy, radiusOuter, angleRef.current, 360),
            createSweepPath(cx, cy, radiusOuter, 0, angleEnd)
          ].join(" ");
        }
        
        sweepRef.current.setAttribute('d', path);
        angleRef.current += 1;
        if (angleRef.current >= 360) angleRef.current = 0;
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showRadar]);

  const renderMarkers = () => {
    const cx = 230, cy = 230, radiusOuter = 215, radiusInner = 15;
    
    return markers.map((marker, index) => {
      const point = polarToCartesian(cx, cy, radiusOuter * marker.r, marker.angle);
      const centerPoint = polarToCartesian(cx, cy, radiusInner + 45, marker.angle);
      
      let textAnchor = "start";
      let offsetX = 14;
      if (marker.angle >= 90 && marker.angle <= 270) {
        textAnchor = "end";
        offsetX = -14;
      }
      
      const labelX = point.x + offsetX;
      const labelY = point.y + 4;

      return (
        <g key={index}>
          {/* Connection line */}
          <line
            x1={centerPoint.x}
            y1={centerPoint.y}
            x2={point.x}
            y2={point.y}
            className="stroke-cyan-400 opacity-40"
            strokeWidth="1"
          />
          
          {/* Marker circle */}
          <circle
            cx={point.x}
            cy={point.y}
            r="9"
            className={`marker-circle ${marker.color} cursor-pointer transition-all duration-300 hover:brightness-125`}
            style={{
              fill: marker.color === 'blue' ? '#22aaff' : 
                    marker.color === 'green' ? '#42f599' :
                    marker.color === 'orange' ? '#ffa46a' : '#ff6a6a',
              stroke: '#14b8a6',
              strokeWidth: 2,
              fillOpacity: 0.8,
              filter: 'drop-shadow(0 0 5px #14b8a6)'
            }}
          />
          
          {/* Icon circle */}
          <circle
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#0f172a"
          />
          
          {/* Label text */}
          <text
            x={labelX}
            y={labelY}
            textAnchor={textAnchor}
            className="fill-slate-300 text-xs select-none"
          >
            {marker.label}
          </text>
          
          {/* Detail text if exists */}
          {marker.detail && (
            <text
              x={labelX}
              y={labelY + 12}
              textAnchor={textAnchor}
              className="fill-slate-500 text-xs select-none"
              fontSize="8"
            >
              {marker.detail}
            </text>
          )}
        </g>
      );
    });
  };

  if (!showRadar) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-300 font-sans overflow-hidden">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-3 shadow-sm sticky top-0 z-40 backdrop-blur-md bg-white/5">
          <div className="flex items-center space-x-2 select-none">
            <svg className="h-8 w-8 animate-spin" style={{animationDuration: '20s'}} viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="#30d5c8" strokeWidth="2" fill="none" strokeDasharray="113" strokeDashoffset="0" />
              <circle cx="20" cy="20" r="14" stroke="#30d5c8" strokeWidth="2" fill="none" strokeDasharray="88" strokeDashoffset="22" />
              <circle cx="20" cy="20" r="10" stroke="#30d5c8" strokeWidth="2" fill="none" strokeDasharray="63" strokeDashoffset="44" />
            </svg>
            <h1 className="text-xl font-bold text-cyan-400">Job Radar</h1>
          </div>
          <div className="flex space-x-4">
            <svg className="h-6 w-6 stroke-slate-500 hover:stroke-cyan-400 cursor-pointer transition-colors" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0v2.25a.75.75 0 01-.75.75h-7.5a.375.375 0 00-.375.375v10.5c0 .621.504 1.125 1.125 1.125h19.5c.621 0 1.125-.504 1.125-1.125V9.375a.375.375 0 00-.375-.375H16.5a.75.75 0 01-.75-.75V6z" />
            </svg>
            <svg className="h-6 w-6 stroke-slate-500 hover:stroke-cyan-400 cursor-pointer transition-colors" fill="none" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <svg className="h-6 w-6 stroke-slate-500 hover:stroke-cyan-400 cursor-pointer transition-colors" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
        </nav>

        {/* Enter Skills Section */}
        <section className="max-w-2xl mx-auto mt-16 p-14 bg-slate-800 rounded-xl shadow-2xl shadow-cyan-400/20 text-slate-300 font-semibold text-center border border-slate-700">
          <h2 className="text-2xl mb-4 text-cyan-400 select-none">Enter Your Skills</h2>
          <p className="font-normal mb-6 text-cyan-200/80">Input skills that best describe you to personalize your job radar.</p>
          
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a skill and press Add"
              className="flex-1 min-w-40 px-4 py-2 rounded-full border border-slate-600 bg-slate-700 text-slate-300 text-base outline-none transition-all focus:border-cyan-400 focus:shadow-sm focus:shadow-cyan-400"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-cyan-400 text-slate-900 rounded-full font-bold cursor-pointer transition-colors hover:bg-cyan-500"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {skills.map((skill, index) => (
              <span key={index} className="bg-cyan-400 text-slate-900 px-3 py-1.5 rounded-full font-bold select-none flex items-center gap-2 text-sm">
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="bg-transparent border-none text-slate-900 font-black cursor-pointer text-lg leading-none px-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={startRadar}
            disabled={skills.length === 0}
            className="bg-cyan-400 border-none text-slate-900 font-bold text-lg cursor-pointer px-8 py-3 rounded-xl transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed hover:enabled:bg-cyan-500"
          >
            Start
          </button>
        </section>

        {/* Decorative star */}
        <div className="fixed bottom-4 right-4 w-8 h-8 bg-cyan-400 opacity-30 pointer-events-none select-none" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans pb-12 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-3 shadow-sm sticky top-0 z-40 backdrop-blur-md bg-white/5">
        <div className="flex items-center space-x-2 select-none">
          <svg className="h-8 w-8 animate-spin" style={{animationDuration: '20s'}} viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="#30d5c8" strokeWidth="2" fill="none" strokeDasharray="113" strokeDashoffset="0" />
            <circle cx="20" cy="20" r="14" stroke="#30d5c8" strokeWidth="2" fill="none" strokeDasharray="88" strokeDashoffset="22" />
            <circle cx="20" cy="20" r="10" stroke="#30d5c8" strokeWidth="2" fill="none" strokeDasharray="63" strokeDashoffset="44" />
          </svg>
          <h1 className="text-xl font-bold text-cyan-400">Job Radar</h1>
        </div>
        <div className="flex space-x-4">
          <svg className="h-6 w-6 stroke-slate-500 hover:stroke-cyan-400 cursor-pointer transition-colors" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0v2.25a.75.75 0 01-.75.75h-7.5a.375.375 0 00-.375.375v10.5c0 .621.504 1.125 1.125 1.125h19.5c.621 0 1.125-.504 1.125-1.125V9.375a.375.375 0 00-.375-.375H16.5a.75.75 0 01-.75-.75V6z" />
          </svg>
          <svg className="h-6 w-6 stroke-slate-500 hover:stroke-cyan-400 cursor-pointer transition-colors" fill="none" strokeWidth="1.75" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          <svg className="h-6 w-6 stroke-slate-500 hover:stroke-cyan-400 cursor-pointer transition-colors" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-8 px-8">
        <div className="block md:flex gap-12 items-stretch min-h-[80vh]">
          
          {/* Radar Section */}
          <section className="flex-[4] bg-slate-800 border border-slate-600 rounded-xl p-8 shadow-xl shadow-cyan-400/15 mb-6 relative select-none">
            <svg viewBox="0 0 460 460" className="max-w-full h-[600px] mx-auto block">
              <defs>
                <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3ee3e1" stopOpacity="0.9" />
                  <stop stopColor="#3ee3e1" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              
              {/* Background circles */}
              <circle cx="230" cy="230" r="215" fill="none" stroke="#30d5c8" strokeOpacity="0.6" />
              <circle cx="230" cy="230" r="195" fill="none" stroke="#3b4b61" strokeWidth="1" />
              <circle cx="230" cy="230" r="175" fill="none" stroke="#3b4b61" strokeWidth="1" />
              <circle cx="230" cy="230" r="155" fill="none" stroke="#3b4b61" strokeWidth="1" />
              <circle cx="230" cy="230" r="135" fill="none" stroke="#3b4b61" strokeWidth="1" />
              <circle cx="230" cy="230" r="115" fill="none" stroke="#3b4b61" strokeWidth="1" />
              <circle cx="230" cy="230" r="95" fill="none" stroke="#3b4b61" strokeWidth="1" />
              <circle cx="230" cy="230" r="75" fill="none" stroke="#3b4b61" strokeWidth="1" />
              <circle cx="230" cy="230" r="55" fill="none" stroke="#3b4b61" strokeWidth="1" />
              <circle cx="230" cy="230" r="35" fill="none" stroke="#3b4b61" strokeWidth="1" />
              <circle cx="230" cy="230" r="15" fill="none" stroke="#30d5c8" strokeWidth="3" filter="drop-shadow(0 0 4px #30d5c8)" />
              
              {/* Radar sweep */}
              <path ref={sweepRef} fill="url(#grad1)" style={{mixBlendMode: 'screen', opacity: 0.15}} />
              
              {/* Center circle and "You" text */}
              <circle cx="230" cy="230" r="45" fill="none" stroke="#30d5c8" strokeWidth="3" filter="drop-shadow(0 0 4px #30d5c8)" />
              <text x="230" y="238" textAnchor="middle" fill="#22dbd8" fontWeight="700" fontSize="19.2" className="select-none">You</text>
              
              {/* Markers */}
              {renderMarkers()}
            </svg>
            
            {/* Skill match badge */}
            <div className="absolute top-1/2 left-36 -translate-x-12 -translate-y-1/2 text-xs px-2 py-1 rounded-md bg-black/50 border border-cyan-400 text-cyan-400 select-none font-extrabold">
              95%
            </div>
          </section>

          {/* Right Sidebar */}
          <section className="flex-[3] flex flex-col gap-8 p-4">
            
            {/* Skill Filters */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 shadow-inner shadow-slate-900/50">
              <h2 className="text-lg font-semibold mb-4 select-none">Skill Filters</h2>
              <div className="flex flex-wrap gap-2">
                {skillFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`px-4 py-2 rounded-full border font-semibold text-sm cursor-pointer select-none transition-all mx-1 my-0.5 ${
                      activeFilters.includes(filter) 
                        ? 'bg-cyan-400 text-slate-900 border-cyan-400 shadow-md shadow-cyan-400/50' 
                        : 'bg-slate-600 text-cyan-200 border-transparent hover:bg-slate-500'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Range Slider */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 select-none">
              <h2 className="text-lg font-semibold mb-4">Salary Range</h2>
              <input
                type="range"
                min="100000"
                max="300000"
                step="1000"
                value={salaryValue}
                onChange={(e) => setSalaryValue(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-600 rounded-lg outline-none cursor-pointer appearance-none shadow-inner shadow-slate-900/50"
                style={{
                  background: `linear-gradient(to right, #22dbd8 0%, #22dbd8 ${(salaryValue - 100000) / 2000}%, #2b3a4d ${(salaryValue - 100000) / 2000}%, #2b3a4d 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>${Math.round(salaryValue / 1000)}K</span>
                <span>${Math.round(salaryValue / 1000)}K+</span>
              </div>
            </div>

            {/* Recently Saved Jobs */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 shadow-md shadow-cyan-400/30 text-slate-400">
              <h3 className="font-bold text-lg mb-3 text-cyan-400 select-none">Recently Saved Jobs</h3>
              <div className="space-y-2">
                {['Bibocum Saved Jobs', 'Recently Saved Jobs', 'Optatan Equitops'].map((job, index) => (
                  <div key={index} className="flex items-center justify-between py-1 cursor-default transition-colors hover:text-cyan-400 select-none">
                    <span>{job}</span>
                    <span className="text-cyan-400 font-black select-none">★</span>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </div>
      </main>

      {/* Decorative star */}
      <div className="fixed bottom-4 right-4 w-8 h-8 bg-cyan-400 opacity-30 pointer-events-none select-none" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', filter: 'drop-shadow(0 0 5px #22dbd8)'}}></div>
    </div>
  );
};

export default App;