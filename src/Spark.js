import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const defaultQuotes = [
  { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs", topics: ["motivation", "work", "passion"], views: 0, favs: 0, status: "approved" },
  { id: 2, text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", topics: ["courage", "challenge", "opportunity"], views: 0, favs: 0, status: "approved" },
  { id: 3, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", topics: ["dreams", "future", "belief"], views: 0, favs: 0, status: "approved" },
  { id: 4, text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", topics: ["courage", "hope", "strength"], views: 0, favs: 0, status: "approved" },
  { id: 5, text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", topics: ["motivation", "action", "time"], views: 0, favs: 0, status: "approved" },
  { id: 6, text: "Creativity is intelligence having fun.", author: "Albert Einstein", topics: ["creativity", "intelligence", "fun"], views: 0, favs: 0, status: "approved" },
  { id: 7, text: "What you get by achieving your goals is not as important as what you become.", author: "Zig Ziglar", topics: ["growth", "goals", "success"], views: 0, favs: 0, status: "approved" },
  { id: 8, text: "The mind is everything. What you think you become.", author: "Buddha", topics: ["mindset", "calm", "wisdom"], views: 0, favs: 0, status: "approved" },
  { id: 9, text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", topics: ["happiness", "action", "calm"], views: 0, favs: 0, status: "approved" },
  { id: 10, text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", topics: ["authenticity", "self", "courage"], views: 0, favs: 0, status: "approved" },
  { id: 11, text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", topics: ["motivation", "action", "courage"], views: 0, favs: 0, status: "approved" },
  { id: 12, text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", topics: ["strength", "wisdom", "growth"], views: 0, favs: 0, status: "approved" },
  { id: 13, text: "Not all those who wander are lost.", author: "J.R.R. Tolkien", topics: ["curiosity", "adventure", "freedom"], views: 0, favs: 0, status: "approved" },
  { id: 14, text: "Life is what happens when you're busy making other plans.", author: "John Lennon", topics: ["life", "mindfulness", "calm"], views: 0, favs: 0, status: "approved" },
  { id: 15, text: "The secret of getting ahead is getting started.", author: "Mark Twain", topics: ["motivation", "action", "success"], views: 0, favs: 0, status: "approved" },
  { id: 16, text: "Everything you can imagine is real.", author: "Pablo Picasso", topics: ["creativity", "imagination", "dreams"], views: 0, favs: 0, status: "approved" },
  { id: 17, text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", topics: ["action", "courage", "motivation"], views: 0, favs: 0, status: "approved" },
  { id: 18, text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", topics: ["creativity", "wisdom", "calm"], views: 0, favs: 0, status: "approved" },
  { id: 19, text: "Stars can't shine without darkness.", author: "D.H. Sidebottom", topics: ["hope", "strength", "courage"], views: 0, favs: 0, status: "approved" },
  { id: 20, text: "The energy of the mind is the essence of life.", author: "Aristotle", topics: ["mindset", "life", "wisdom"], views: 0, favs: 0, status: "approved" },
  { id: 21, text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", topics: ["belief", "motivation", "courage"], views: 0, favs: 0, status: "approved" },
  { id: 22, text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", topics: ["strength", "self", "wisdom"], views: 0, favs: 0, status: "approved" },
  { id: 23, text: "The best revenge is massive success.", author: "Frank Sinatra", topics: ["success", "motivation", "strength"], views: 0, favs: 0, status: "approved" },
  { id: 24, text: "It always seems impossible until it's done.", author: "Nelson Mandela", topics: ["courage", "motivation", "hope"], views: 0, favs: 0, status: "approved" },
  { id: 25, text: "Imagination is the beginning of creation.", author: "George Bernard Shaw", topics: ["creativity", "imagination", "dreams"], views: 0, favs: 0, status: "approved" },
  { id: 26, text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi", topics: ["change", "action", "wisdom"], views: 0, favs: 0, status: "approved" },
  { id: 27, text: "Love all, trust a few, do wrong to none.", author: "William Shakespeare", topics: ["love", "wisdom", "life"], views: 0, favs: 0, status: "approved" },
  { id: 28, text: "Where there is love there is life.", author: "Mahatma Gandhi", topics: ["love", "life", "happiness"], views: 0, favs: 0, status: "approved" },
  { id: 29, text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", topics: ["strength", "courage", "growth"], views: 0, favs: 0, status: "approved" },
  { id: 30, text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde", topics: ["life", "authenticity", "curiosity"], views: 0, favs: 0, status: "approved" },
  { id: 31, text: "Stay hungry, stay foolish.", author: "Steve Jobs", topics: ["curiosity", "creativity", "motivation"], views: 0, favs: 0, status: "approved" },
  { id: 32, text: "The wound is the place where the light enters you.", author: "Rumi", topics: ["strength", "hope", "wisdom"], views: 0, favs: 0, status: "approved" },
  { id: 33, text: "If you want to fly, give up everything that weighs you down.", author: "Toni Morrison", topics: ["freedom", "courage", "growth"], views: 0, favs: 0, status: "approved" },
  { id: 34, text: "A ship in harbor is safe, but that is not what ships are built for.", author: "John A. Shedd", topics: ["courage", "adventure", "action"], views: 0, favs: 0, status: "approved" },
  { id: 35, text: "What we think, we become.", author: "Buddha", topics: ["mindset", "calm", "wisdom"], views: 0, favs: 0, status: "approved" },
];

const defaultMoods = {
  all: { label: "All", gradient: ["#6366f1", "#8b5cf6", "#a855f7"], bg: "#0f0a1e" },
  motivation: { label: "Motivation", gradient: ["#f97316", "#ef4444", "#ec4899"], bg: "#1a0a0a" },
  calm: { label: "Calm", gradient: ["#06b6d4", "#3b82f6", "#6366f1"], bg: "#0a0f1a" },
  curiosity: { label: "Curiosity", gradient: ["#a855f7", "#ec4899", "#f43f5e"], bg: "#1a0a1a" },
  courage: { label: "Courage", gradient: ["#eab308", "#f97316", "#ef4444"], bg: "#1a150a" },
  creativity: { label: "Creativity", gradient: ["#10b981", "#06b6d4", "#8b5cf6"], bg: "#0a1a15" },
  love: { label: "Love", gradient: ["#ec4899", "#f43f5e", "#f97316"], bg: "#1a0a10" },
};

const Particle = ({ x, y, size, color, delay, mouseX, mouseY }) => {
  const dx = (mouseX - 50) * 0.3, dy = (mouseY - 50) * 0.3;
  return (
    <div style={{
      position: "absolute", left: `${x}%`, top: `${y}%`, width: size, height: size,
      borderRadius: "50%", background: color, opacity: 0.4, filter: `blur(${size / 3}px)`,
      transform: `translate(${dx * (size / 20)}px, ${dy * (size / 20)}px)`,
      transition: "transform 0.8s ease-out",
      animation: `float ${4 + Math.random() * 4}s ease-in-out ${delay}s infinite alternate`,
    }} />
  );
};

// --- ADMIN COMPONENTS ---
const StatCard = ({ label, value, color }) => (
  <div style={{
    background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "16px 20px",
    border: "1px solid rgba(255,255,255,0.08)", flex: "1 1 140px", minWidth: 140,
  }}>
    <div style={{ fontSize: 24, fontWeight: 700, color }}>{value}</div>
    <div style={{ fontSize: 13, opacity: 0.5, marginTop: 4 }}>{label}</div>
  </div>
);

const AdminDashboard = ({ quotes, searchLog }) => {
  const approved = quotes.filter(q => q.status === "approved");
  const pending = quotes.filter(q => q.status === "pending");
  const topics = [...new Set(approved.flatMap(q => q.topics))];
  const topQuotes = [...approved].sort((a, b) => b.views - a.views).slice(0, 5);
  const topicCounts = {};
  searchLog.forEach(s => { topicCounts[s] = (topicCounts[s] || 0) + 1; });
  const topSearches = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <StatCard label="Total Quotes" value={approved.length} color="#8b5cf6" />
        <StatCard label="Topics" value={topics.length} color="#06b6d4" />
        <StatCard label="Pending" value={pending.length} color="#f97316" />
        <StatCard label="Total Views" value={approved.reduce((s, q) => s + q.views, 0)} color="#10b981" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
          <h4 style={{ margin: "0 0 12px", fontSize: 14, opacity: 0.6 }}>Most Viewed Quotes</h4>
          {topQuotes.map((q, i) => (
            <div key={q.id} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 13 }}>
              <span style={{ opacity: 0.4, marginRight: 8 }}>#{i + 1}</span>
              "{q.text.slice(0, 50)}..." <span style={{ opacity: 0.4, float: "right" }}>{q.views} views</span>
            </div>
          ))}
          {topQuotes.length === 0 && <p style={{ opacity: 0.3, fontSize: 13 }}>No data yet</p>}
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
          <h4 style={{ margin: "0 0 12px", fontSize: 14, opacity: 0.6 }}>Top Searches</h4>
          {topSearches.map(([term, count], i) => (
            <div key={term} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 13 }}>
              <span style={{ opacity: 0.4, marginRight: 8 }}>#{i + 1}</span>
              {term} <span style={{ opacity: 0.4, float: "right" }}>{count}×</span>
            </div>
          ))}
          {topSearches.length === 0 && <p style={{ opacity: 0.3, fontSize: 13 }}>No searches yet</p>}
        </div>
      </div>
    </div>
  );
};

const QuoteManager = ({ quotes, setQuotes, allTopics }) => {
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ text: "", author: "", topics: "" });
  const [showAdd, setShowAdd] = useState(false);

  const approved = quotes.filter(q => q.status === "approved");
  const filtered = filter
    ? approved.filter(q => q.text.toLowerCase().includes(filter.toLowerCase()) || q.author.toLowerCase().includes(filter.toLowerCase()) || q.topics.some(t => t.includes(filter.toLowerCase())))
    : approved;

  const handleAdd = () => {
    if (!form.text.trim() || !form.author.trim()) return;
    const newQ = {
      id: Date.now(), text: form.text.trim(), author: form.author.trim(),
      topics: form.topics.split(",").map(t => t.trim().toLowerCase()).filter(Boolean),
      views: 0, favs: 0, status: "approved",
    };
    setQuotes([...quotes, newQ]);
    setForm({ text: "", author: "", topics: "" });
    setShowAdd(false);
  };

  const handleEdit = (q) => {
    setEditing(q.id);
    setForm({ text: q.text, author: q.author, topics: q.topics.join(", ") });
  };

  const handleSave = (id) => {
    setQuotes(quotes.map(q => q.id === id ? {
      ...q, text: form.text.trim(), author: form.author.trim(),
      topics: form.topics.split(",").map(t => t.trim().toLowerCase()).filter(Boolean),
    } : q));
    setEditing(null);
    setForm({ text: "", author: "", topics: "" });
  };

  const handleDelete = (id) => {
    if (confirm("Delete this quote?")) setQuotes(quotes.filter(q => q.id !== id));
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13, width: "100%", outline: "none",
  };
  const btnStyle = (bg) => ({
    background: bg, border: "none", color: "#fff", padding: "6px 14px",
    borderRadius: 8, cursor: "pointer", fontSize: 12, transition: "opacity 0.2s",
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
        <input placeholder="Filter quotes..." value={filter} onChange={e => setFilter(e.target.value)}
          style={{ ...inputStyle, maxWidth: 300 }} />
        <button onClick={() => setShowAdd(!showAdd)} style={btnStyle(showAdd ? "rgba(255,255,255,0.1)" : "#8b5cf6")}>
          {showAdd ? "Cancel" : "+ Add Quote"}
        </button>
        <span style={{ fontSize: 13, opacity: 0.4, marginLeft: "auto" }}>{filtered.length} quotes</span>
      </div>

      {showAdd && (
        <div style={{
          background: "rgba(139,92,246,0.08)", borderRadius: 12, padding: 16,
          border: "1px solid rgba(139,92,246,0.2)", marginBottom: 16,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <textarea placeholder="Quote text..." value={form.text} onChange={e => setForm({ ...form, text: e.target.value })}
              style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} />
            <input placeholder="Author..." value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} style={inputStyle} />
            <input placeholder="Topics (comma separated)..." value={form.topics} onChange={e => setForm({ ...form, topics: e.target.value })} style={inputStyle} />
            <button onClick={handleAdd} style={btnStyle("#8b5cf6")}>Add Quote</button>
          </div>
        </div>
      )}

      <div style={{ maxHeight: 400, overflowY: "auto" }}>
        {filtered.map(q => (
          <div key={q.id} style={{
            padding: 14, background: "rgba(255,255,255,0.03)", borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.06)", marginBottom: 8,
          }}>
            {editing === q.id ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} style={{ ...inputStyle, minHeight: 50 }} />
                <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} style={inputStyle} />
                <input value={form.topics} onChange={e => setForm({ ...form, topics: e.target.value })} style={inputStyle} />
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => handleSave(q.id)} style={btnStyle("#10b981")}>Save</button>
                  <button onClick={() => setEditing(null)} style={btnStyle("rgba(255,255,255,0.1)")}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 4 }}>"{q.text}"</div>
                <div style={{ fontSize: 12, opacity: 0.5 }}>— {q.author}</div>
                <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  {q.topics.map(t => (
                    <span key={t} style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 99,
                      background: "rgba(255,255,255,0.08)", opacity: 0.7,
                    }}>{t}</span>
                  ))}
                  <span style={{ marginLeft: "auto", fontSize: 11, opacity: 0.3 }}>{q.views} views · {q.favs} favs</span>
                  <button onClick={() => handleEdit(q)} style={btnStyle("rgba(255,255,255,0.1)")}>Edit</button>
                  <button onClick={() => handleDelete(q.id)} style={btnStyle("rgba(239,68,68,0.3)")}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TopicManager = ({ quotes, setQuotes, moods, setMoods }) => {
  const topics = {};
  quotes.filter(q => q.status === "approved").forEach(q => q.topics.forEach(t => { topics[t] = (topics[t] || 0) + 1; }));
  const sorted = Object.entries(topics).sort((a, b) => b[1] - a[1]);
  const [newTopic, setNewTopic] = useState("");
  const [renaming, setRenaming] = useState(null);
  const [renameVal, setRenameVal] = useState("");

  const inputStyle = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 13, outline: "none",
  };
  const btnS = (bg) => ({
    background: bg, border: "none", color: "#fff", padding: "5px 12px",
    borderRadius: 8, cursor: "pointer", fontSize: 12,
  });

  const renameTopic = (old, newName) => {
    const n = newName.trim().toLowerCase();
    if (!n || n === old) { setRenaming(null); return; }
    setQuotes(quotes.map(q => ({
      ...q, topics: q.topics.map(t => t === old ? n : t),
    })));
    setRenaming(null);
  };

  const deleteTopic = (topic) => {
    if (!confirm(`Remove "${topic}" from all quotes?`)) return;
    setQuotes(quotes.map(q => ({ ...q, topics: q.topics.filter(t => t !== topic) })));
  };

  return (
    <div>
      <h4 style={{ margin: "0 0 16px", fontSize: 14, opacity: 0.6 }}>Topics ({sorted.length})</h4>
      <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 16 }}>
        {sorted.map(([topic, count]) => (
          <div key={topic} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
            background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 4,
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
            {renaming === topic ? (
              <>
                <input value={renameVal} onChange={e => setRenameVal(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && renameTopic(topic, renameVal)} style={inputStyle} autoFocus />
                <button onClick={() => renameTopic(topic, renameVal)} style={btnS("#10b981")}>Save</button>
                <button onClick={() => setRenaming(null)} style={btnS("rgba(255,255,255,0.1)")}>✕</button>
              </>
            ) : (
              <>
                <span style={{ fontSize: 14, flex: 1 }}>{topic}</span>
                <span style={{ fontSize: 12, opacity: 0.4 }}>{count} quotes</span>
                <button onClick={() => { setRenaming(topic); setRenameVal(topic); }} style={btnS("rgba(255,255,255,0.1)")}>Rename</button>
                <button onClick={() => deleteTopic(topic)} style={btnS("rgba(239,68,68,0.3)")}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
      <h4 style={{ margin: "0 0 12px", fontSize: 14, opacity: 0.6 }}>Mood Categories</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {Object.entries(moods).filter(([k]) => k !== "all").map(([key, m]) => (
          <div key={key} style={{
            padding: "8px 16px", borderRadius: 99, fontSize: 13,
            background: `linear-gradient(135deg, ${m.gradient.join(",")})`, opacity: 0.8,
          }}>{m.label}</div>
        ))}
      </div>
    </div>
  );
};

const ModerationQueue = ({ quotes, setQuotes }) => {
  const pending = quotes.filter(q => q.status === "pending");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ text: "", author: "", topics: "" });

  const approve = (id) => setQuotes(quotes.map(q => q.id === id ? { ...q, status: "approved" } : q));
  const reject = (id) => setQuotes(quotes.filter(q => q.id !== id));
  const startEdit = (q) => { setEditId(q.id); setEditForm({ text: q.text, author: q.author, topics: q.topics.join(", ") }); };
  const saveEdit = (id) => {
    setQuotes(quotes.map(q => q.id === id ? {
      ...q, text: editForm.text, author: editForm.author,
      topics: editForm.topics.split(",").map(t => t.trim().toLowerCase()).filter(Boolean), status: "approved",
    } : q));
    setEditId(null);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13, width: "100%", outline: "none",
  };
  const btnS = (bg) => ({
    background: bg, border: "none", color: "#fff", padding: "6px 14px",
    borderRadius: 8, cursor: "pointer", fontSize: 12,
  });

  return (
    <div>
      {pending.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, opacity: 0.4 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
          <div>No pending submissions</div>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: 13, opacity: 0.5, marginBottom: 12 }}>{pending.length} pending submissions</p>
          {pending.map(q => (
            <div key={q.id} style={{
              padding: 16, background: "rgba(249,115,22,0.06)", borderRadius: 12,
              border: "1px solid rgba(249,115,22,0.15)", marginBottom: 10,
            }}>
              {editId === q.id ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <textarea value={editForm.text} onChange={e => setEditForm({ ...editForm, text: e.target.value })} style={{ ...inputStyle, minHeight: 50 }} />
                  <input value={editForm.author} onChange={e => setEditForm({ ...editForm, author: e.target.value })} style={inputStyle} />
                  <input value={editForm.topics} onChange={e => setEditForm({ ...editForm, topics: e.target.value })} style={inputStyle} placeholder="Topics (comma separated)" />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => saveEdit(q.id)} style={btnS("#10b981")}>Save & Approve</button>
                    <button onClick={() => setEditId(null)} style={btnS("rgba(255,255,255,0.1)")}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 4 }}>"{q.text}"</div>
                  <div style={{ fontSize: 12, opacity: 0.5 }}>— {q.author}</div>
                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    {q.topics.map(t => <span key={t} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "rgba(255,255,255,0.08)" }}>{t}</span>)}
                  </div>
                  <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                    <button onClick={() => approve(q.id)} style={btnS("#10b981")}>Approve</button>
                    <button onClick={() => startEdit(q)} style={btnS("rgba(255,255,255,0.15)")}>Edit & Approve</button>
                    <button onClick={() => reject(q.id)} style={btnS("rgba(239,68,68,0.3)")}>Reject</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Submit Quote Modal
const ADMIN_CREDENTIALS = { username: "admin", password: "spark2025" };

const LoginModal = ({ onLogin, onClose }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const inputStyle = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, width: "100%", outline: "none",
  };
  const handle = () => {
    if (form.username === ADMIN_CREDENTIALS.username && form.password === ADMIN_CREDENTIALS.password) {
      onLogin();
    } else {
      setError("Invalid username or password");
      setTimeout(() => setError(""), 3000);
    }
  };
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(8px)",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1a1528", borderRadius: 16, padding: 28, width: "90%", maxWidth: 380,
        border: "1px solid rgba(255,255,255,0.1)", animation: "fadeSlideIn 0.3s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔐</div>
          <h3 style={{ margin: 0, fontSize: 18 }}>Admin Login</h3>
          <p style={{ fontSize: 13, opacity: 0.4, marginTop: 4 }}>Enter your credentials to continue</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
            onKeyDown={e => e.key === "Enter" && handle()} style={inputStyle} autoFocus />
          <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === "Enter" && handle()} style={inputStyle} />
          {error && <div style={{ color: "#ef4444", fontSize: 13, textAlign: "center", animation: "fadeSlideIn 0.2s ease" }}>{error}</div>}
          <button onClick={handle} style={{
            padding: "10px", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg, #8b5cf6, #6366f1)", color: "#fff",
            fontSize: 14, cursor: "pointer", fontWeight: 600, marginTop: 4,
          }}>Log In</button>
          <button onClick={onClose} style={{
            padding: "8px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer",
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const SubmitModal = ({ onSubmit, onClose }) => {
  const [form, setForm] = useState({ text: "", author: "", topics: "" });
  const inputStyle = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, width: "100%", outline: "none",
  };
  const handle = () => {
    if (!form.text.trim() || !form.author.trim()) return;
    onSubmit({
      id: Date.now(), text: form.text.trim(), author: form.author.trim(),
      topics: form.topics.split(",").map(t => t.trim().toLowerCase()).filter(Boolean),
      views: 0, favs: 0, status: "pending",
    });
    onClose();
  };
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(8px)",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1a1528", borderRadius: 16, padding: 28, width: "90%", maxWidth: 440,
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 18 }}>Submit a Quote</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <textarea placeholder="Your favorite quote..." value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} style={{ ...inputStyle, minHeight: 70 }} />
          <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} style={inputStyle} />
          <input placeholder="Topics (comma separated)" value={form.topics} onChange={e => setForm({ ...form, topics: e.target.value })} style={inputStyle} />
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button onClick={handle} style={{
              flex: 1, padding: "10px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)", color: "#fff",
              fontSize: 14, cursor: "pointer", fontWeight: 600,
            }}>Submit for Review</button>
            <button onClick={onClose} style={{
              padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent", color: "#fff", fontSize: 14, cursor: "pointer",
            }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function Spark() {
  const [quotes, setQuotes] = useState(defaultQuotes);
  const [moodsData, setMoodsData] = useState(defaultMoods);
  const [mood, setMood] = useState("all");
  const [current, setCurrent] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavs, setShowFavs] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [animKey, setAnimKey] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [typing, setTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [view, setView] = useState("explore"); // explore | admin
  const [adminTab, setAdminTab] = useState("dashboard");
  const [searchLog, setSearchLog] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const containerRef = useRef(null);

  const approvedQuotes = useMemo(() => quotes.filter(q => q.status === "approved"), [quotes]);
  const allTopics = useMemo(() => [...new Set(approvedQuotes.flatMap(q => q.topics))].sort(), [approvedQuotes]);

  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: 4 + Math.random() * 30, delay: Math.random() * 3,
    })), []);

  const moodData = moodsData[mood];

  const getFiltered = useCallback((m, s) => {
    let f = approvedQuotes;
    if (m !== "all") f = f.filter(q => q.topics.includes(m));
    if (s) f = f.filter(q => q.topics.some(t => t.includes(s.toLowerCase())) || q.text.toLowerCase().includes(s.toLowerCase()) || q.author.toLowerCase().includes(s.toLowerCase()));
    return f.length ? f : approvedQuotes;
  }, [approvedQuotes]);

  const pickRandom = useCallback((m = mood, s = "") => {
    const pool = getFiltered(m, s);
    const q = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(q);
    setAnimKey(k => k + 1);
    setTyping(true);
    setTypedText("");
    setQuotes(prev => prev.map(pq => pq.id === q.id ? { ...pq, views: pq.views + 1 } : pq));
  }, [mood, getFiltered]);

  useEffect(() => { pickRandom(); }, []);

  useEffect(() => {
    if (!typing || !current) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTypedText(current.text.slice(0, i));
      if (i >= current.text.length) { clearInterval(iv); setTyping(false); }
    }, 28);
    return () => clearInterval(iv);
  }, [typing, current, animKey]);

  useEffect(() => {
    if (search.length > 0) {
      setSuggestions(allTopics.filter(t => t.includes(search.toLowerCase())).slice(0, 5));
    } else setSuggestions([]);
  }, [search, allTopics]);

  const handleMouse = useCallback((e) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setMousePos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, []);

  const toggleFav = () => {
    if (!current) return;
    const isFaved = favorites.some(q => q.id === current.id);
    setFavorites(f => isFaved ? f.filter(q => q.id !== current.id) : [...f, current]);
    setQuotes(prev => prev.map(q => q.id === current.id ? { ...q, favs: q.favs + (isFaved ? -1 : 1) } : q));
  };

  const isFav = current && favorites.some(q => q.id === current.id);

  const handleSearch = (term) => {
    setSearchResults(getFiltered(mood, term));
    setSearch(term);
    setSuggestions([]);
    setSearchLog(prev => [...prev, term.toLowerCase()]);
  };

  const clearSearch = () => { setSearch(""); setSearchResults(null); setSuggestions([]); };

  const copyQuote = () => {
    if (!current) return;
    navigator.clipboard.writeText(`"${current.text}" — ${current.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitQuote = (q) => setQuotes(prev => [...prev, q]);

  const grad = `linear-gradient(135deg, ${moodData.gradient.join(", ")})`;

  const adminTabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "quotes", label: "Quotes" },
    { key: "topics", label: "Topics & Moods" },
    { key: "moderation", label: `Moderation (${quotes.filter(q => q.status === "pending").length})` },
  ];

  return (
    <div ref={containerRef} onMouseMove={handleMouse} style={{
      minHeight: "100vh", background: view === "admin" ? "#0c0917" : moodData.bg,
      color: "#fff", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      overflow: "hidden", position: "relative", transition: "background 0.8s ease",
    }}>
      <style>{`
        @keyframes float { 0%{transform:translateY(0)} 100%{transform:translateY(-20px)} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .m-btn{padding:8px 18px;border-radius:99px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:#fff;cursor:pointer;font-size:14px;transition:all .3s;backdrop-filter:blur(10px)}
        .m-btn:hover{background:rgba(255,255,255,0.15);transform:scale(1.05)}
        .m-btn.active{border-color:transparent;font-weight:600}
        .s-input{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:99px;padding:10px 20px;color:#fff;font-size:15px;outline:none;width:100%;max-width:400px;backdrop-filter:blur(10px);transition:all .3s}
        .s-input::placeholder{color:rgba(255,255,255,0.4)}
        .s-input:focus{border-color:rgba(255,255,255,0.4);background:rgba(255,255,255,0.12)}
        .sug{padding:8px 16px;cursor:pointer;transition:all .2s;border-radius:8px}
        .sug:hover{background:rgba(255,255,255,0.15)}
        .tag{display:inline-block;padding:4px 12px;border-radius:99px;font-size:12px;background:rgba(255,255,255,0.1);margin:3px;cursor:pointer;transition:all .3s;border:1px solid rgba(255,255,255,0.1)}
        .tag:hover{background:rgba(255,255,255,0.2);transform:scale(1.05)}
        .abtn{width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:#fff;cursor:pointer;font-size:20px;display:flex;align-items:center;justify-content:center;transition:all .3s;backdrop-filter:blur(10px);position:relative}
        .abtn:hover{background:rgba(255,255,255,0.2);transform:scale(1.1)}
        .fav-i{padding:16px;background:rgba(255,255,255,0.05);border-radius:12px;margin-bottom:10px;border:1px solid rgba(255,255,255,0.08);cursor:pointer;transition:all .3s}
        .fav-i:hover{background:rgba(255,255,255,0.1);transform:translateX(4px)}
        .res-c{padding:16px;background:rgba(255,255,255,0.05);border-radius:12px;margin-bottom:8px;border:1px solid rgba(255,255,255,0.08);cursor:pointer;transition:all .3s;animation:fadeSlideIn .4s ease forwards}
        .res-c:hover{background:rgba(255,255,255,0.1)}
        .atab{padding:8px 16px;border-radius:8px;border:none;color:#fff;cursor:pointer;font-size:13px;transition:all .2s;background:transparent;opacity:0.5}
        .atab:hover{opacity:0.8;background:rgba(255,255,255,0.05)}
        .atab.active{opacity:1;background:rgba(255,255,255,0.08)}
      `}</style>

      {/* Particles (only in explore) */}
      {view === "explore" && particles.map(p => (
        <Particle key={p.id} {...p} color={moodData.gradient[p.id % 3]} mouseX={mousePos.x} mouseY={mousePos.y} />
      ))}
      {view === "explore" && (
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: grad, opacity: 0.08, filter: "blur(100px)",
          left: `${mousePos.x - 10}%`, top: `${mousePos.y - 10}%`,
          transition: "left 1s ease-out, top 1s ease-out", pointerEvents: "none",
        }} />
      )}

      <div style={{ position: "relative", zIndex: 10, padding: "30px 20px", maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h1 onClick={() => setView("explore")} style={{
            fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: -1, cursor: "pointer",
            background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundSize: "200% auto", animation: "shimmer 4s linear infinite",
          }}>✦ Quotify</h1>
          <div style={{ display: "flex", gap: 8 }}>
            {view === "explore" && (
              <button onClick={() => setShowSubmit(true)} style={{
                padding: "8px 16px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", fontSize: 13,
              }}>Submit Quote</button>
            )}
            {view === "admin" && isAdmin && (
              <button onClick={() => { setIsAdmin(false); setView("explore"); }} style={{
                padding: "8px 16px", borderRadius: 99, border: "1px solid rgba(239,68,68,0.3)",
                background: "rgba(239,68,68,0.1)", color: "#fff", cursor: "pointer", fontSize: 13,
              }}>Logout</button>
            )}
            <button onClick={() => {
              if (view === "admin") { setView("explore"); }
              else if (isAdmin) { setView("admin"); }
              else { setShowLogin(true); }
            }} style={{
              padding: "8px 16px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.15)",
              background: view === "admin" ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.05)",
              color: "#fff", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6,
            }}>{view === "admin" ? "← Back to Explore" : <><span style={{ fontSize: 15 }}>🔒</span> Admin</>}</button>
          </div>
        </div>

        {view === "admin" ? (
          <div style={{ animation: "fadeSlideIn 0.4s ease" }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
              {adminTabs.map(t => (
                <button key={t.key} className={`atab ${adminTab === t.key ? "active" : ""}`}
                  onClick={() => setAdminTab(t.key)}>{t.label}</button>
              ))}
            </div>
            {adminTab === "dashboard" && <AdminDashboard quotes={quotes} searchLog={searchLog} />}
            {adminTab === "quotes" && <QuoteManager quotes={quotes} setQuotes={setQuotes} allTopics={allTopics} />}
            {adminTab === "topics" && <TopicManager quotes={quotes} setQuotes={setQuotes} moods={moodsData} setMoods={setMoodsData} />}
            {adminTab === "moderation" && <ModerationQueue quotes={quotes} setQuotes={setQuotes} />}
          </div>
        ) : (
          <>
            {/* Search */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, position: "relative" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: 400 }}>
                <input className="s-input" placeholder="Search topics, words, or authors..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch(search)} />
                {search && <button onClick={clearSearch} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 18 }}>✕</button>}
                {suggestions.length > 0 && (
                  <div style={{ position: "absolute", top: "110%", left: 0, right: 0, background: "rgba(15,10,30,0.95)", borderRadius: 12, padding: 6, border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", zIndex: 20 }}>
                    {suggestions.map(s => <div key={s} className="sug" onClick={() => handleSearch(s)}><span style={{ opacity: 0.5, marginRight: 8 }}>🔍</span>{s}</div>)}
                  </div>
                )}
              </div>
            </div>

            {/* Moods */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 30 }}>
              {Object.entries(moodsData).map(([key, m]) => (
                <button key={key} className={`m-btn ${mood === key ? "active" : ""}`}
                  style={mood === key ? { background: grad } : {}}
                  onClick={() => { setMood(key); clearSearch(); pickRandom(key, ""); }}>{m.label}</button>
              ))}
            </div>

            {searchResults ? (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 14, opacity: 0.5 }}>{searchResults.length} results for "{search}"</span>
                  <button onClick={clearSearch} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "6px 14px", borderRadius: 99, cursor: "pointer", fontSize: 13 }}>Back</button>
                </div>
                <div style={{ maxHeight: 400, overflowY: "auto" }}>
                  {searchResults.map((q, i) => (
                    <div key={i} className="res-c" style={{ animationDelay: `${i * 0.05}s` }}
                      onClick={() => { setCurrent(q); setAnimKey(k => k + 1); setTyping(true); setTypedText(""); setSearchResults(null); setSearch(""); setQuotes(prev => prev.map(pq => pq.id === q.id ? { ...pq, views: pq.views + 1 } : pq)); }}>
                      <div style={{ fontSize: 15, lineHeight: 1.5, marginBottom: 6 }}>"{q.text}"</div>
                      <div style={{ fontSize: 13, opacity: 0.5 }}>— {q.author}</div>
                      <div style={{ marginTop: 6 }}>{q.topics.map(t => <span key={t} className="tag">{t}</span>)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {current && (
                  <div key={animKey} style={{ textAlign: "center", margin: "20px 0 30px", animation: "fadeSlideIn 0.6s ease" }}>
                    <div style={{ fontSize: 28, fontWeight: 300, lineHeight: 1.5, maxWidth: 600, margin: "0 auto 16px", minHeight: 100 }}>
                      "{typedText}"{typing && <span style={{ animation: "pulse 1s infinite", opacity: 0.5 }}>|</span>}
                    </div>
                    <div style={{ fontSize: 16, opacity: typing ? 0 : 0.6, transition: "opacity 0.5s", fontStyle: "italic" }}>— {current.author}</div>
                    <div style={{ marginTop: 12, opacity: typing ? 0 : 1, transition: "opacity 0.5s 0.2s" }}>
                      {current.topics.map(t => <span key={t} className="tag" onClick={() => handleSearch(t)}>{t}</span>)}
                    </div>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 30 }}>
                  <button className="abtn" onClick={() => pickRandom()} title="New quote" style={{ animation: "pulse 3s ease-in-out infinite" }}>✦</button>
                  <button className="abtn" onClick={toggleFav} title="Favorite"
                    style={isFav ? { background: "rgba(236,72,153,0.3)", borderColor: "rgba(236,72,153,0.5)" } : {}}>{isFav ? "♥" : "♡"}</button>
                  <button className="abtn" onClick={copyQuote} title="Copy">{copied ? "✓" : "⎘"}</button>
                  <button className="abtn" onClick={() => setShowFavs(!showFavs)} title="Favorites"
                    style={showFavs ? { background: "rgba(255,255,255,0.2)" } : {}}>
                    ☆{favorites.length > 0 && <span style={{ fontSize: 11, position: "absolute", top: -4, right: -4, background: grad, borderRadius: 99, padding: "2px 6px" }}>{favorites.length}</span>}
                  </button>
                </div>
              </>
            )}

            {showFavs && (
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 20, border: "1px solid rgba(255,255,255,0.08)", animation: "fadeSlideIn 0.4s ease" }}>
                <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600 }}>♥ Saved ({favorites.length})</h3>
                {favorites.length === 0 ? <p style={{ opacity: 0.4, fontSize: 14 }}>Tap the heart to save quotes.</p> :
                  favorites.map((q, i) => (
                    <div key={i} className="fav-i" onClick={() => { setCurrent(q); setAnimKey(k => k + 1); setTyping(true); setTypedText(""); setShowFavs(false); }}>
                      <div style={{ fontSize: 14, lineHeight: 1.5 }}>"{q.text}"</div>
                      <div style={{ fontSize: 12, opacity: 0.5, marginTop: 4 }}>— {q.author}</div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>

      {showSubmit && <SubmitModal onSubmit={handleSubmitQuote} onClose={() => setShowSubmit(false)} />}
      {showLogin && <LoginModal onLogin={() => { setIsAdmin(true); setShowLogin(false); setView("admin"); }} onClose={() => setShowLogin(false)} />}
    </div>
  );
}