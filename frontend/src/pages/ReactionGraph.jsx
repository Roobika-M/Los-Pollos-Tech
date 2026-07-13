import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ReactionGraph.css";

/* ===================================================================
   THE NETWORK — force-directed map of every logged reaction.
   Compounds are nodes, reactions are edges. Reactants pull toward
   the product they yield, like tracing a synthesis route on the
   whiteboard. Built as a small self-contained physics loop so it
   has no extra dependencies beyond what the rest of the app uses.
   =================================================================== */

const REPULSION = 2600;      // how hard nodes push each other apart
const SPRING_LENGTH = 150;   // resting length of a reaction edge
const SPRING_K = 0.02;       // edge stiffness
const CENTER_PULL = 0.012;   // gentle pull toward canvas center
const DAMPING = 0.82;
const MAX_SPEED = 14;

function buildGraph(reactions) {
  const nodeMap = new Map();
  const edges = [];

  const ensureNode = (label) => {
    const key = label.trim().toLowerCase();
    if (!key) return null;
    if (!nodeMap.has(key)) {
      nodeMap.set(key, {
        id: key,
        label: label.trim(),
        isProduct: false,
        isReactant: false,
        degree: 0,
        x: Math.random() * 600 + 100,
        y: Math.random() * 400 + 100,
        vx: 0,
        vy: 0,
      });
    }
    return nodeMap.get(key);
  };

  reactions.forEach((reaction) => {
    const a = ensureNode(reaction.reactantOne || "");
    const b = ensureNode(reaction.reactantTwo || "");
    const p = ensureNode(reaction.product || "");

    if (a) a.isReactant = true;
    if (b) b.isReactant = true;
    if (p) p.isProduct = true;

    if (a && p) {
      edges.push({ id: `${reaction.id}-a`, source: a.id, target: p.id, reaction });
      a.degree += 1;
      p.degree += 1;
    }
    if (b && p) {
      edges.push({ id: `${reaction.id}-b`, source: b.id, target: p.id, reaction });
      b.degree += 1;
      p.degree += 1;
    }
  });

  return { nodes: Array.from(nodeMap.values()), edges };
}

function ReactionGraph() {
  const navigate = useNavigate();
  const [reactions, setReactions] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [, forceRender] = useState(0);

  const svgRef = useRef(null);
  const graphRef = useRef({ nodes: [], edges: [] });
  const dragRef = useRef(null);
  const dimsRef = useRef({ w: 900, h: 560 });
  const rafRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/los/get`);
        setReactions(response.data);
        setMessage("");
      } catch (error) {
        console.error(error);
        setMessage("Unable to load the network.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    graphRef.current = buildGraph(reactions);
    forceRender((n) => n + 1);
  }, [reactions]);

  useEffect(() => {
    const measure = () => {
      const el = svgRef.current;
      if (el) {
        dimsRef.current = {
          w: el.clientWidth || 900,
          h: el.clientHeight || 560,
        };
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const tick = useCallback(() => {
    const { nodes, edges } = graphRef.current;
    const { w, h } = dimsRef.current;
    const cx = w / 2;
    const cy = h / 2;

    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        let dx = n1.x - n2.x;
        let dy = n1.y - n2.y;
        let distSq = dx * dx + dy * dy;
        if (distSq < 1) distSq = 1;
        const dist = Math.sqrt(distSq);
        const force = REPULSION / distSq;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        n1.vx += fx;
        n1.vy += fy;
        n2.vx -= fx;
        n2.vy -= fy;
      }
    }

    edges.forEach((edge) => {
      const s = nodes.find((n) => n.id === edge.source);
      const t = nodes.find((n) => n.id === edge.target);
      if (!s || !t) return;
      const dx = t.x - s.x;
      const dy = t.y - s.y;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const displacement = dist - SPRING_LENGTH;
      const force = displacement * SPRING_K;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      s.vx += fx;
      s.vy += fy;
      t.vx -= fx;
      t.vy -= fy;
    });

    nodes.forEach((n) => {
      if (dragRef.current && dragRef.current.id === n.id) return;
      n.vx += (cx - n.x) * CENTER_PULL;
      n.vy += (cy - n.y) * CENTER_PULL;
      n.vx *= DAMPING;
      n.vy *= DAMPING;
      const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (speed > MAX_SPEED) {
        n.vx = (n.vx / speed) * MAX_SPEED;
        n.vy = (n.vy / speed) * MAX_SPEED;
      }
      n.x += n.vx;
      n.y += n.vy;
      const pad = 60;
      n.x = Math.min(Math.max(n.x, pad), Math.max(w - pad, pad));
      n.y = Math.min(Math.max(n.y, pad), Math.max(h - pad, pad));
    });

    forceRender((n) => n + 1);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const toSvgPoint = (evt) => {
    const el = svgRef.current;
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerDown = (node) => (evt) => {
    evt.stopPropagation();
    const pt = toSvgPoint(evt);
    dragRef.current = { id: node.id, offX: node.x - pt.x, offY: node.y - pt.y };
    setSelectedNode(node.id);
  };

  const handlePointerMove = (evt) => {
    if (!dragRef.current) return;
    const pt = toSvgPoint(evt);
    const node = graphRef.current.nodes.find((n) => n.id === dragRef.current.id);
    if (node) {
      node.x = pt.x + dragRef.current.offX;
      node.y = pt.y + dragRef.current.offY;
      node.vx = 0;
      node.vy = 0;
    }
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const { nodes, edges } = graphRef.current;
  const activeNode = nodes.find((n) => n.id === selectedNode);
  const activeReactions = activeNode
    ? reactions.filter((r) => {
        const one = (r.reactantOne || "").trim().toLowerCase();
        const two = (r.reactantTwo || "").trim().toLowerCase();
        const prod = (r.product || "").trim().toLowerCase();
        return [one, two, prod].includes(activeNode.id);
      })
    : [];

  return (
    <div className="page graph-page">
      <button className="page-back" onClick={() => navigate("/home")}>&larr; Lab</button>

      <div className="eyebrow">Los Pollos Tech</div>
      <h1 className="page-title">The Network</h1>
      <p className="page-subtitle">Every logged synthesis, mapped as one map of the trade.</p>

      {loading && <p className="empty-state">Charting the network…</p>}
      {!loading && message && <p className="status-msg err" style={{ marginBottom: 24 }}>{message}</p>}
      {!loading && !message && nodes.length === 0 && (
        <p className="empty-state">No reactions on file yet. Log one to start the map.</p>
      )}

      {!loading && nodes.length > 0 && (
        <div className="graph-shell panel">
          <div className="graph-legend">
            <span className="legend-item">
              <span className="legend-dot legend-dot--product" /> product
            </span>
            <span className="legend-item">
              <span className="legend-dot legend-dot--reactant" /> reactant
            </span>
            <span className="legend-item legend-count">
              {nodes.length} compounds · {edges.length} reactions
            </span>
          </div>

          <svg
            ref={svgRef}
            className="graph-svg"
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onClick={() => setSelectedNode(null)}
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" className="edge-arrowhead" />
              </marker>
            </defs>

            {edges.map((edge) => {
              const s = nodes.find((n) => n.id === edge.source);
              const t = nodes.find((n) => n.id === edge.target);
              if (!s || !t) return null;
              const isHovered = hoveredEdge === edge.id;
              const isSelected =
                selectedNode && (edge.source === selectedNode || edge.target === selectedNode);
              return (
                <line
                  key={edge.id}
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  className={`graph-edge${isHovered ? " graph-edge--hover" : ""}${
                    isSelected ? " graph-edge--selected" : ""
                  }`}
                  markerEnd="url(#arrow)"
                  onMouseEnter={() => setHoveredEdge(edge.id)}
                  onMouseLeave={() => setHoveredEdge(null)}
                  onClick={(evt) => evt.stopPropagation()}
                >
                  <title>
                    {edge.reaction.reactantOne} + {edge.reaction.reactantTwo} → {edge.reaction.product}
                    {edge.reaction.reactionType ? ` (${edge.reaction.reactionType})` : ""}
                  </title>
                </line>
              );
            })}

            {nodes.map((node) => {
              const isSelected = selectedNode === node.id;
              const radius = 14 + Math.min(node.degree, 6) * 2.5;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className={`graph-node${isSelected ? " graph-node--selected" : ""}`}
                  onMouseDown={handlePointerDown(node)}
                  onClick={(evt) => {
                    evt.stopPropagation();
                    setSelectedNode(node.id);
                  }}
                >
                  <circle
                    r={radius}
                    className={`node-circle${
                      node.isProduct ? " node-circle--product" : " node-circle--reactant"
                    }`}
                  />
                  <text className="node-label" y={radius + 16}>
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {activeNode && (
            <div className="graph-detail">
              <div className="graph-detail__header">
                <h3>{activeNode.label}</h3>
                <button className="graph-detail__close" onClick={() => setSelectedNode(null)}>
                  &times;
                </button>
              </div>
              {activeReactions.length === 0 ? (
                <p className="empty-state" style={{ padding: "12px 0" }}>No linked reactions.</p>
              ) : (
                <div className="graph-detail__list">
                  {activeReactions.map((r) => (
                    <div key={r.id} className="graph-detail__row">
                      <div className="graph-detail__equation">
                        {r.reactantOne} + {r.reactantTwo} <span className="arrow-glyph">&rarr;</span> {r.product}
                      </div>
                      {r.reactionType && <p className="row"><span className="tag">Type</span>{r.reactionType}</p>}
                      {r.conditions && <p className="row"><span className="tag">Conditions</span>{r.conditions}</p>}
                      {r.description && <p className="row"><span className="tag">Notes</span>{r.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReactionGraph;
