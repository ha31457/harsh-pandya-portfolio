"use client";

import React, { useState, useEffect, useRef } from "react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { SectionHeader } from "../ui/SectionHeader";
import { 
  Play, 
  Square, 
  RotateCcw, 
  Radio, 
  Database, 
  Layers, 
  Server, 
  Cpu, 
  Gauge
} from "lucide-react";

interface SystemRequest {
  id: number;
  step: "client" | "lb" | "server" | "cache" | "db" | "done";
  targetServer: "A" | "B";
  isCacheHit: boolean;
  timestamp: number;
  color: string;
}

interface KafkaMessage {
  id: number;
  topic: string;
  payload: string;
  status: "queued" | "processing" | "done";
}

export const SystemsSimulator: React.FC = () => {
  // Nodes statuses
  const [serverAOnline, setServerAOnline] = useState(true);
  const [serverBOnline, setServerBOnline] = useState(true);
  const [cacheOnline, setCacheOnline] = useState(true);
  const [replicaOnline, setReplicaOnline] = useState(true);

  // Simulation controls
  const [autoTraffic, setAutoTraffic] = useState(false);
  const [trafficRate, setTrafficRate] = useState(1); // requests per second
  const [activeRequests, setActiveRequests] = useState<SystemRequest[]>([]);
  const [requestLog, setRequestLog] = useState<string[]>([]);
  
  // Metrics
  const [totalRequests, setTotalRequests] = useState(0);
  const [cacheHits, setCacheHits] = useState(0);
  const [avgLatency, setAvgLatency] = useState(0);
  const [currentRps, setCurrentRps] = useState(0);

  // Kafka Queue
  const [kafkaQueue, setKafkaQueue] = useState<KafkaMessage[]>([]);
  const [kafkaProcessing, setKafkaProcessing] = useState(false);

  // Internal counters
  const reqIdCounter = useRef(0);
  const kafkaIdCounter = useRef(0);
  const lastRpsCheck = useRef(Date.now());
  const rpsCount = useRef(0);

  // Add system log helper
  const addLog = (msg: string) => {
    setRequestLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev.slice(0, 19),
    ]);
  };

  // 1. Send request trigger
  const triggerRequest = () => {
    // Check if both servers are down
    if (!serverAOnline && !serverBOnline) {
      addLog("CRITICAL: request dropped. Spring Cloud Gateway reported 503 Service Unavailable.");
      rpsCount.current += 1;
      setTotalRequests((prev) => prev + 1);
      setAvgLatency((prev) => {
        const target = 500; // timeout latency
        return prev === 0 ? target : Math.round(prev * 0.95 + target * 0.05);
      });
      return;
    }

    reqIdCounter.current += 1;
    const reqId = reqIdCounter.current;
    
    // Choose server based on availability (Weighted Round Robin / Failover mimicry)
    let selectedServer: "A" | "B" = "A";
    if (serverAOnline && serverBOnline) {
      selectedServer = reqId % 2 === 0 ? "A" : "B";
    } else if (serverAOnline) {
      selectedServer = "A";
    } else {
      selectedServer = "B";
    }

    // Determine cache hit
    const hasCache = cacheOnline;
    const isHit = hasCache ? Math.random() < 0.75 : false; // 75% hit rate

    const colors = ["#38BDF8", "#3B82F6", "#60A5FA", "#A855F7", "#06B6D4"];
    const randomColor = colors[reqId % colors.length];

    const newRequest: SystemRequest = {
      id: reqId,
      step: "client",
      targetServer: selectedServer,
      isCacheHit: isHit,
      timestamp: Date.now(),
      color: randomColor,
    };

    setActiveRequests((prev) => [...prev, newRequest]);
    setTotalRequests((prev) => prev + 1);
    rpsCount.current += 1;

    // Correct request lifecycle flow: Client -> Gateway -> API Server A/B -> Cache -> DB (on miss) -> Done
    // Client -> Gateway (200ms)
    setTimeout(() => {
      updateRequestStep(reqId, "lb");
      
      // Gateway -> API Server (400ms)
      setTimeout(() => {
        updateRequestStep(reqId, "server");
        
        // API Server -> Redis Cache lookup (600ms)
        setTimeout(() => {
          updateRequestStep(reqId, "cache");
          
          if (isHit) {
            // Cache Hit -> Direct return to Client (800ms)
            setCacheHits((prev) => prev + 1);
            setTimeout(() => {
              updateRequestStep(reqId, "done");
              completeRequest(reqId, 8); // ~8ms latency
            }, 200);
          } else {
            // Cache Miss -> API Server queries Postgres DB (800ms)
            setTimeout(() => {
              updateRequestStep(reqId, "db");
              
              // Database response -> API Server -> Client (1100ms)
              setTimeout(() => {
                updateRequestStep(reqId, "done");
                const latency = Math.round(45 + Math.random() * 15);
                completeRequest(reqId, latency);
              }, 300);
            }, 200);
          }
        }, 200);
      }, 200);
    }, 200);
  };

  const updateRequestStep = (id: number, step: SystemRequest["step"]) => {
    setActiveRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, step } : r))
    );
  };

  const completeRequest = (id: number, latency: number) => {
    // Remove request from active visualization
    setTimeout(() => {
      setActiveRequests((prev) => prev.filter((r) => r.id !== id));
    }, 400);

    // Update Average Latency metric
    setAvgLatency((prev) => {
      if (prev === 0) return latency;
      return Math.round(prev * 0.9 + latency * 0.1); // exponential moving average
    });

    const targetReq = activeRequests.find((r) => r.id === id);
    if (targetReq) {
      if (targetReq.isCacheHit) {
        addLog(`Gateway routed req #${id} to Server ${targetReq.targetServer} | CACHE_HIT (Redis) | latency: ${latency}ms`);
      } else {
        addLog(`Gateway routed req #${id} to Server ${targetReq.targetServer} | CACHE_MISS -> Postgres query | latency: ${latency}ms`);
      }
    }
  };

  // 2. Publish Message to Kafka
  const publishKafkaMessage = () => {
    kafkaIdCounter.current += 1;
    const msgId = kafkaIdCounter.current;
    const topics = ["order.created", "payment.processed", "user.signup", "inventory.updated"];
    const selectedTopic = topics[msgId % topics.length];

    const newMsg: KafkaMessage = {
      id: msgId,
      topic: selectedTopic,
      payload: `{"id":"uuid-${msgId}","timestamp":${Date.now()}}`,
      status: "queued",
    };

    setKafkaQueue((prev) => [...prev, newMsg]);
    addLog(`Kafka Producer published event: ${selectedTopic} (#${msgId})`);
  };

  // Kafka Consumer Processing Loop
  useEffect(() => {
    if (kafkaQueue.length === 0 || kafkaProcessing) return;

    setKafkaProcessing(true);
    const currentMsg = kafkaQueue[0];

    // Simulating consumer processing time
    setTimeout(() => {
      // Set to processing
      setKafkaQueue((prev) =>
        prev.map((m) => (m.id === currentMsg.id ? { ...m, status: "processing" } : m))
      );
      addLog(`Kafka Consumer pulled event: ${currentMsg.topic} (#${currentMsg.id}) - executing business logic`);

      setTimeout(() => {
        // Complete processing and dequeue
        setKafkaQueue((prev) => prev.filter((m) => m.id !== currentMsg.id));
        setKafkaProcessing(false);
        addLog(`Kafka ConsumerGroup worker processed event (#${currentMsg.id}) - state synced`);
      }, 1000);
    }, 600);
  }, [kafkaQueue, kafkaProcessing]);

  // 3. Traffic generator loop
  useEffect(() => {
    if (!autoTraffic) return;

    const intervalTime = 1000 / trafficRate;
    const interval = setInterval(() => {
      triggerRequest();
    }, intervalTime);

    return () => clearInterval(interval);
  }, [autoTraffic, trafficRate, serverAOnline, serverBOnline, cacheOnline]);

  // 4. Live RPS metrics calculator
  useEffect(() => {
    const rpsInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - lastRpsCheck.current) / 1000;
      const calculatedRps = Math.round(rpsCount.current / elapsed);
      setCurrentRps(calculatedRps);
      
      rpsCount.current = 0;
      lastRpsCheck.current = now;
    }, 1500);

    return () => clearInterval(rpsInterval);
  }, []);

  // Calculate Cache Hit Rate
  const cacheHitRate = totalRequests === 0 ? 0 : Math.round((cacheHits / totalRequests) * 100);

  return (
    <section id="simulator" className="py-20 bg-slate-950/20 relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none radial-mask" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          method="SYSTEM"
          path="/api/v1/distributed-systems/simulator"
          subtitle="Interact with a live visualization of my distributed backend architecture. Toggle server nodes offline to simulate crash failovers, clear caches, and publish to Kafka message brokers."
        />

        {/* Dashboard Controller */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <GlassCard className="lg:col-span-3 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40" hoverEffect={false}>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Simulator Settings</span>
              <h3 className="text-lg font-bold text-white font-mono">Control Operations Console</h3>
            </div>
            
            {/* Control Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setAutoTraffic(!autoTraffic)}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs font-semibold rounded border transition-all ${
                  autoTraffic
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/30 glow-rose"
                    : "bg-brand-blue/10 text-brand-light border-brand-blue/30 hover:bg-brand-blue/20"
                }`}
              >
                {autoTraffic ? <Square size={14} /> : <Play size={14} />}
                {autoTraffic ? "STOP AUTO TRAFFIC" : "START LOAD TEST"}
              </button>

              {autoTraffic && (
                <div className="flex items-center gap-2 border border-slate-800 rounded px-2.5 py-1.5 bg-slate-950/60">
                  <span className="text-[10px] font-mono text-slate-500">RATE:</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={trafficRate}
                    onChange={(e) => setTrafficRate(Number(e.target.value))}
                    className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                  <span className="text-xs font-mono text-white font-semibold">{trafficRate} req/s</span>
                </div>
              )}

              <button
                onClick={triggerRequest}
                disabled={autoTraffic}
                className="flex items-center gap-2 px-4 py-2 font-mono text-xs font-semibold rounded border bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Radio size={14} className={autoTraffic ? "animate-pulse text-emerald-400" : ""} />
                SEND SINGLE REQ
              </button>

              <button
                onClick={() => {
                  setTotalRequests(0);
                  setCacheHits(0);
                  setAvgLatency(0);
                  setRequestLog([]);
                  setKafkaQueue([]);
                  addLog("Simulator database counters reset to zero.");
                }}
                className="p-2 border border-slate-800 rounded bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700"
                title="Reset Stats"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </GlassCard>

          {/* Quick Metrics */}
          <GlassCard className="bg-slate-900/40 p-4 flex flex-col justify-between" hoverEffect={false}>
            <div className="flex items-center gap-2 text-brand-light font-mono text-xs mb-2">
              <Gauge size={14} />
              <span>LIVE METRICS MONITOR</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-950/60 rounded p-2 border border-slate-900">
                <div className="text-[10px] font-mono text-slate-500 uppercase">LOAD (RPS)</div>
                <div className="text-lg font-mono font-bold text-white mt-0.5">
                  {autoTraffic ? currentRps : activeRequests.length > 0 ? 1 : 0}
                </div>
              </div>
              <div className="bg-slate-950/60 rounded p-2 border border-slate-900">
                <div className="text-[10px] font-mono text-slate-500 uppercase">LATENCY</div>
                <div className={`text-lg font-mono font-bold mt-0.5 ${
                  avgLatency > 150 ? "text-rose-400" : avgLatency > 30 ? "text-amber-400" : "text-emerald-400"
                }`}>
                  {avgLatency === 0 ? "--" : `${avgLatency}ms`}
                </div>
              </div>
              <div className="bg-slate-950/60 rounded p-2 border border-slate-900 col-span-2">
                <div className="text-[10px] font-mono text-slate-500 uppercase">CACHE HIT RATE</div>
                <div className="text-base font-mono font-bold text-brand-cyan mt-0.5">
                  {cacheHitRate}% <span className="text-[10px] text-slate-500 font-normal">({cacheHits} / {totalRequests})</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Visual Architecture Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Request Pipeline */}
          <div className="lg:col-span-2 flex flex-col gap-6 relative">
            <GlassCard className="bg-slate-900/20 border-slate-800/80 p-8 min-h-[500px] flex flex-col justify-between" hoverEffect={false}>
              
              {/* Architecture Canvas (Simulated Node Connections) */}
              <div className="relative w-full h-[320px] border border-slate-800/40 rounded-xl bg-slate-950/70 overflow-hidden p-6 flex flex-col justify-between">
                {/* SVG connection lines with animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Client -> Gateway */}
                  <line x1="50" y1="160" x2="190" y2="160" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
                  
                  {/* Gateway -> Server A */}
                  <path d="M 230,160 Q 280,75 350,75" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
                  {/* Gateway -> Server B */}
                  <path d="M 230,160 Q 280,245 350,245" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Servers -> Cache (Redis) */}
                  <path d="M 430,75 Q 480,75 510,120" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
                  <path d="M 430,245 Q 480,245 510,180" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Cache -> DB */}
                  <path d="M 540,140 Q 580,70 630,70" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />

                  {/* DB Sync (Replica) */}
                  <path d="M 680,185 Q 680,210 680,230" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Pulsing request animations */}
                  {activeRequests.map((req) => {
                    let cx = 0;
                    let cy = 0;

                    if (req.step === "client") {
                      cx = 50; cy = 160;
                    } else if (req.step === "lb") {
                      cx = 190; cy = 160;
                    } else if (req.step === "server") {
                      cx = 350;
                      cy = req.targetServer === "A" ? 75 : 245;
                    } else if (req.step === "cache") {
                      cx = 510; cy = 150;
                    } else if (req.step === "db") {
                      cx = 670; cy = 70;
                    }

                    if (cx === 0 && cy === 0) return null;

                    return (
                      <circle
                        key={req.id}
                        cx={cx}
                        cy={cy}
                        r="6"
                        fill={req.color}
                        className="transition-all duration-300 ease-out"
                        style={{
                          filter: `drop-shadow(0 0 6px ${req.color})`,
                        }}
                      />
                    );
                  })}

                  {/* DB Replication pulse */}
                  {activeRequests.some((r) => r.step === "db") && replicaOnline && (
                    <circle
                      cx="680"
                      cy="210"
                      r="4"
                      fill="#a855f7"
                      className="animate-bounce"
                      style={{ filter: "drop-shadow(0 0 4px #a855f7)" }}
                    />
                  )}
                </svg>

                {/* 1. Client Node */}
                <div className="absolute left-2 top-[130px] flex flex-col items-center gap-1">
                  <div className="h-14 w-16 bg-slate-900/90 border border-slate-700 rounded-lg flex items-center justify-center font-mono text-xs text-white shadow-lg">
                    Client
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">req_origin</span>
                </div>

                {/* 2. Spring API Gateway Node */}
                <div className="absolute left-[160px] top-[110px] flex flex-col items-center gap-1">
                  <div className="h-24 w-20 bg-slate-900/90 border border-brand-blue rounded-lg flex flex-col items-center justify-center font-mono p-2 shadow-lg glow-blue/20">
                    <Radio className="text-brand-blue mb-2 animate-pulse" size={18} />
                    <span className="text-[9px] text-white font-bold text-center">Spring Gateway</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">API Gateway</span>
                </div>

                {/* 3. Server A Node */}
                <div className={`absolute left-[330px] top-[25px] flex flex-col items-center gap-1 transition-all`}>
                  <button
                    onClick={() => {
                      setServerAOnline(!serverAOnline);
                      addLog(`Operator toggled API Server A to: ${!serverAOnline ? "ONLINE" : "OFFLINE"}`);
                    }}
                    className={`h-24 w-20 rounded-lg border flex flex-col items-center justify-center font-mono p-2 shadow-lg cursor-pointer transition-all ${
                      serverAOnline 
                        ? "bg-slate-900/90 border-slate-700 hover:border-brand-blue text-slate-200" 
                        : "bg-rose-950/20 border-rose-900 text-rose-500 hover:bg-rose-900/20"
                    }`}
                  >
                    <Server size={18} className={serverAOnline ? "text-emerald-400" : "text-rose-500"} />
                    <span className="text-[9px] font-bold mt-1">API Node A</span>
                    <span className="text-[8px] font-semibold mt-1 opacity-70">
                      {serverAOnline ? "ONLINE" : "CRASHED"}
                    </span>
                  </button>
                </div>

                {/* 4. Server B Node */}
                <div className="absolute left-[330px] top-[195px] flex flex-col items-center gap-1">
                  <button
                    onClick={() => {
                      setServerBOnline(!serverBOnline);
                      addLog(`Operator toggled API Server B to: ${!serverBOnline ? "ONLINE" : "OFFLINE"}`);
                    }}
                    className={`h-24 w-20 rounded-lg border flex flex-col items-center justify-center font-mono p-2 shadow-lg cursor-pointer transition-all ${
                      serverBOnline 
                        ? "bg-slate-900/90 border-slate-700 hover:border-brand-blue text-slate-200" 
                        : "bg-rose-950/20 border-rose-900 text-rose-500 hover:bg-rose-900/20"
                    }`}
                  >
                    <Server size={18} className={serverBOnline ? "text-emerald-400" : "text-rose-500"} />
                    <span className="text-[9px] font-bold mt-1">API Node B</span>
                    <span className="text-[8px] font-semibold mt-1 opacity-70">
                      {serverBOnline ? "ONLINE" : "CRASHED"}
                    </span>
                  </button>
                </div>

                {/* 5. Redis Cache Node */}
                <div className="absolute left-[480px] top-[105px] flex flex-col items-center gap-1">
                  <button
                    onClick={() => {
                      setCacheOnline(!cacheOnline);
                      addLog(`Operator toggled Redis Cache node to: ${!cacheOnline ? "ONLINE" : "OFFLINE"}`);
                    }}
                    className={`h-24 w-18 rounded-lg border flex flex-col items-center justify-center font-mono p-2 shadow-lg cursor-pointer transition-all ${
                      cacheOnline 
                        ? "bg-slate-900/90 border-brand-cyan/40 text-slate-200 hover:bg-slate-900" 
                        : "bg-rose-950/20 border-rose-900 text-rose-500 hover:bg-rose-900/20"
                    }`}
                  >
                    <Layers size={18} className={cacheOnline ? "text-brand-cyan animate-pulse" : "text-rose-500"} />
                    <span className="text-[9px] font-bold mt-1">Redis</span>
                    <span className="text-[8px] opacity-70">{cacheOnline ? "CACHE" : "DOWN"}</span>
                  </button>
                </div>

                {/* 6. Database (Primary) */}
                <div className="absolute left-[620px] top-[30px] flex flex-col items-center gap-1">
                  <div className="h-20 w-24 bg-slate-900/90 border border-slate-700 rounded-lg flex flex-col items-center justify-center font-mono p-2 shadow-lg">
                    <Database className="text-brand-light" size={16} />
                    <span className="text-[9px] font-bold mt-1 text-white">Postgres (Pri)</span>
                    <span className="text-[8px] text-emerald-400 font-mono mt-0.5">WRITE / READ</span>
                  </div>
                </div>

                {/* 7. Database (Replica Sync) */}
                <div className="absolute left-[620px] top-[195px] flex flex-col items-center gap-1">
                  <button
                    onClick={() => {
                      setReplicaOnline(!replicaOnline);
                      addLog(`Operator toggled Database Read-Replica to: ${!replicaOnline ? "ONLINE" : "OFFLINE"}`);
                    }}
                    className={`h-20 w-24 rounded-lg border flex flex-col items-center justify-center font-mono p-2 shadow-lg cursor-pointer transition-all ${
                      replicaOnline 
                        ? "bg-slate-900/90 border-slate-700 hover:border-brand-purple text-slate-200" 
                        : "bg-rose-950/20 border-rose-900 text-rose-500 hover:bg-rose-900/20"
                    }`}
                  >
                    <Database className={replicaOnline ? "text-brand-purple" : "text-rose-500"} size={16} />
                    <span className="text-[9px] font-bold mt-1">Postgres (Repl)</span>
                    <span className="text-[8px] opacity-70">{replicaOnline ? "READ_ONLY" : "DOWN"}</span>
                  </button>
                </div>
              </div>

              {/* Console Logs */}
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Real-time System Logs</span>
                <div className="h-32 bg-slate-950/90 border border-slate-800 rounded-lg p-3 font-mono text-[10px] text-slate-300 overflow-y-auto flex flex-col-reverse gap-1 select-text">
                  {requestLog.length === 0 ? (
                    <span className="text-slate-600 italic">No events processed yet. Click 'START LOAD TEST' or 'SEND SINGLE REQ' to trigger actions.</span>
                  ) : (
                    requestLog.map((log, i) => {
                      let textColor = "text-slate-300";
                      if (log.includes("CRITICAL") || log.includes("dropped")) textColor = "text-rose-400 font-semibold";
                      else if (log.includes("CACHE_HIT")) textColor = "text-brand-cyan";
                      else if (log.includes("Kafka")) textColor = "text-amber-300";
                      return (
                        <div key={i} className={`leading-relaxed ${textColor}`}>
                          {log}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </GlassCard>
          </div>

          {/* Event Driven Pipeline: Kafka Broker Queue */}
          <div className="flex flex-col gap-6">
            <GlassCard className="bg-slate-900/20 border-slate-800/80 p-6 flex flex-col justify-between h-full" hoverEffect={false}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
                    <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest">Apache Kafka Broker</span>
                  </div>
                  <button
                    onClick={publishKafkaMessage}
                    className="px-2.5 py-1 text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded hover:bg-amber-500/20 transition-all"
                  >
                    PUBLISH EVENT
                  </button>
                </div>

                <p className="text-xs text-slate-400 mb-6 font-sans">
                  Publish asynchronous jobs to simulate events processed by decoupled background worker tasks. Shows queue buffering.
                </p>

                {/* Kafka Queue Buffer visual */}
                <div className="flex flex-col gap-3 min-h-[220px]">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Queue Buffer ({kafkaQueue.length} jobs)</span>
                  <div className="flex-1 border border-slate-800/60 bg-slate-950/50 rounded-lg p-3 flex flex-col gap-2 overflow-y-auto max-h-[240px]">
                    {kafkaQueue.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center text-[10px] font-mono text-slate-600 italic">
                        Topic: queue_idle
                      </div>
                    ) : (
                      kafkaQueue.map((msg, i) => (
                        <div
                          key={msg.id}
                          className={`p-2 rounded border font-mono text-[9px] transition-all duration-300 ${
                            msg.status === "processing"
                              ? "bg-amber-500/10 border-amber-400 text-amber-300 animate-pulse"
                              : "bg-slate-900/80 border-slate-800 text-slate-400"
                          }`}
                        >
                          <div className="flex justify-between font-bold">
                            <span>{msg.topic}</span>
                            <span className="opacity-70">#{msg.id}</span>
                          </div>
                          <div className="mt-1 text-slate-500 truncate">{msg.payload}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Kafka Consumer Node */}
              <div className="mt-6 border-t border-slate-800/80 pt-6">
                <div className="flex items-center justify-between bg-slate-950/80 border border-slate-800 rounded-lg p-3 font-mono">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className={kafkaProcessing ? "text-amber-400 animate-spin" : "text-slate-500"} />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white font-bold">Email/Sync Consumer</span>
                      <span className="text-[8px] text-slate-500">Group: NotificationService</span>
                    </div>
                  </div>
                  <Badge
                    text={kafkaProcessing ? "ACTIVE" : "IDLE"}
                    variant={kafkaProcessing ? "cyan" : "gray"}
                    pulse={kafkaProcessing}
                  />
                </div>
              </div>

            </GlassCard>
          </div>
        </div>

      </div>
    </section>
  );
};
