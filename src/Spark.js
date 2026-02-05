import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const defaultQuotes = [
  { id:1, text:"The only way to do great work is to love what you do.", author:"Steve Jobs", topics:["motivation","work","passion"], views:0, favs:0, status:"approved" },
  { id:2, text:"In the middle of difficulty lies opportunity.", author:"Albert Einstein", topics:["courage","challenge","opportunity"], views:0, favs:0, status:"approved" },
  { id:3, text:"The future belongs to those who believe in the beauty of their dreams.", author:"Eleanor Roosevelt", topics:["dreams","future","belief"], views:0, favs:0, status:"approved" },
  { id:4, text:"It is during our darkest moments that we must focus to see the light.", author:"Aristotle", topics:["courage","hope","strength"], views:0, favs:0, status:"approved" },
  { id:5, text:"The best time to plant a tree was 20 years ago. The second best time is now.", author:"Chinese Proverb", topics:["motivation","action","time"], views:0, favs:0, status:"approved" },
  { id:6, text:"Creativity is intelligence having fun.", author:"Albert Einstein", topics:["creativity","intelligence","fun"], views:0, favs:0, status:"approved" },
  { id:7, text:"What you get by achieving your goals is not as important as what you become.", author:"Zig Ziglar", topics:["growth","goals","success"], views:0, favs:0, status:"approved" },
  { id:8, text:"The mind is everything. What you think you become.", author:"Buddha", topics:["mindset","calm","wisdom"], views:0, favs:0, status:"approved" },
  { id:9, text:"Happiness is not something ready made. It comes from your own actions.", author:"Dalai Lama", topics:["happiness","action","calm"], views:0, favs:0, status:"approved" },
  { id:10, text:"Be yourself; everyone else is already taken.", author:"Oscar Wilde", topics:["authenticity","self","courage"], views:0, favs:0, status:"approved" },
  { id:11, text:"The only impossible journey is the one you never begin.", author:"Tony Robbins", topics:["motivation","action","courage"], views:0, favs:0, status:"approved" },
  { id:12, text:"Turn your wounds into wisdom.", author:"Oprah Winfrey", topics:["strength","wisdom","growth"], views:0, favs:0, status:"approved" },
  { id:13, text:"Not all those who wander are lost.", author:"J.R.R. Tolkien", topics:["curiosity","adventure","freedom"], views:0, favs:0, status:"approved" },
  { id:14, text:"Life is what happens when you're busy making other plans.", author:"John Lennon", topics:["life","mindfulness","calm"], views:0, favs:0, status:"approved" },
  { id:15, text:"The secret of getting ahead is getting started.", author:"Mark Twain", topics:["motivation","action","success"], views:0, favs:0, status:"approved" },
  { id:16, text:"Everything you can imagine is real.", author:"Pablo Picasso", topics:["creativity","imagination","dreams"], views:0, favs:0, status:"approved" },
  { id:17, text:"Do what you can, with what you have, where you are.", author:"Theodore Roosevelt", topics:["action","courage","motivation"], views:0, favs:0, status:"approved" },
  { id:18, text:"Simplicity is the ultimate sophistication.", author:"Leonardo da Vinci", topics:["creativity","wisdom","calm"], views:0, favs:0, status:"approved" },
  { id:19, text:"Stars can't shine without darkness.", author:"D.H. Sidebottom", topics:["hope","strength","courage"], views:0, favs:0, status:"approved" },
  { id:20, text:"The energy of the mind is the essence of life.", author:"Aristotle", topics:["mindset","life","wisdom"], views:0, favs:0, status:"approved" },
  { id:21, text:"Believe you can and you're halfway there.", author:"Theodore Roosevelt", topics:["belief","motivation","courage"], views:0, favs:0, status:"approved" },
  { id:22, text:"What lies behind us and what lies before us are tiny matters compared to what lies within us.", author:"Ralph Waldo Emerson", topics:["strength","self","wisdom"], views:0, favs:0, status:"approved" },
  { id:23, text:"The best revenge is massive success.", author:"Frank Sinatra", topics:["success","motivation","strength"], views:0, favs:0, status:"approved" },
  { id:24, text:"It always seems impossible until it's done.", author:"Nelson Mandela", topics:["courage","motivation","hope"], views:0, favs:0, status:"approved" },
  { id:25, text:"Imagination is the beginning of creation.", author:"George Bernard Shaw", topics:["creativity","imagination","dreams"], views:0, favs:0, status:"approved" },
  { id:26, text:"You must be the change you wish to see in the world.", author:"Mahatma Gandhi", topics:["change","action","wisdom"], views:0, favs:0, status:"approved" },
  { id:27, text:"Love all, trust a few, do wrong to none.", author:"William Shakespeare", topics:["love","wisdom","life"], views:0, favs:0, status:"approved" },
  { id:28, text:"Where there is love there is life.", author:"Mahatma Gandhi", topics:["love","life","happiness"], views:0, favs:0, status:"approved" },
  { id:29, text:"The greatest glory in living lies not in never falling, but in rising every time we fall.", author:"Nelson Mandela", topics:["strength","courage","growth"], views:0, favs:0, status:"approved" },
  { id:30, text:"To live is the rarest thing in the world. Most people exist, that is all.", author:"Oscar Wilde", topics:["life","authenticity","curiosity"], views:0, favs:0, status:"approved" },
  { id:31, text:"Stay hungry, stay foolish.", author:"Steve Jobs", topics:["curiosity","creativity","motivation"], views:0, favs:0, status:"approved" },
  { id:32, text:"The wound is the place where the light enters you.", author:"Rumi", topics:["strength","hope","wisdom"], views:0, favs:0, status:"approved" },
  { id:33, text:"If you want to fly, give up everything that weighs you down.", author:"Toni Morrison", topics:["freedom","courage","growth"], views:0, favs:0, status:"approved" },
  { id:34, text:"A ship in harbor is safe, but that is not what ships are built for.", author:"John A. Shedd", topics:["courage","adventure","action"], views:0, favs:0, status:"approved" },
  { id:35, text:"What we think, we become.", author:"Buddha", topics:["mindset","calm","wisdom"], views:0, favs:0, status:"approved" },
];

var darkMoods = {
  all:{label:"All",gradient:["#6366f1","#8b5cf6","#a855f7"],bg:"#0f0a1e"},
  motivation:{label:"Motivation",gradient:["#f97316","#ef4444","#ec4899"],bg:"#1a0a0a"},
  calm:{label:"Calm",gradient:["#06b6d4","#3b82f6","#6366f1"],bg:"#0a0f1a"},
  curiosity:{label:"Curiosity",gradient:["#a855f7","#ec4899","#f43f5e"],bg:"#1a0a1a"},
  courage:{label:"Courage",gradient:["#eab308","#f97316","#ef4444"],bg:"#1a150a"},
  creativity:{label:"Creativity",gradient:["#10b981","#06b6d4","#8b5cf6"],bg:"#0a1a15"},
  love:{label:"Love",gradient:["#ec4899","#f43f5e","#f97316"],bg:"#1a0a10"},
};
var lightMoods = {
  all:{label:"All",gradient:["#6366f1","#8b5cf6","#a855f7"],bg:"#f8f7ff"},
  motivation:{label:"Motivation",gradient:["#f97316","#ef4444","#ec4899"],bg:"#fff7f5"},
  calm:{label:"Calm",gradient:["#06b6d4","#3b82f6","#6366f1"],bg:"#f0f7ff"},
  curiosity:{label:"Curiosity",gradient:["#a855f7","#ec4899","#f43f5e"],bg:"#fdf5ff"},
  courage:{label:"Courage",gradient:["#eab308","#f97316","#ef4444"],bg:"#fffbf0"},
  creativity:{label:"Creativity",gradient:["#10b981","#06b6d4","#8b5cf6"],bg:"#f0fdf8"},
  love:{label:"Love",gradient:["#ec4899","#f43f5e","#f97316"],bg:"#fff5f8"},
};

var ADMIN = {username:"admin",password:"spark2025"};

function getDailyQuote(quotes){
  var d=new Date();
  var seed=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
  var ap=quotes.filter(function(q){return q.status==="approved"});
  return ap[seed%ap.length];
}

function useThemeColors(light){
  return {
    fg: light?"#1a1a2e":"#fff",
    fgSoft: light?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.5)",
    border: light?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.15)",
    cardBg: light?"rgba(0,0,0,0.03)":"rgba(255,255,255,0.05)",
    cardBdr: light?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.08)",
    hoverBg: light?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.1)",
    inputBg: light?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.06)",
    inputBdr: light?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.12)",
    modalBg: light?"#fff":"#1a1528",
    panelBg: light?"rgba(0,0,0,0.02)":"rgba(255,255,255,0.03)",
    panelBdr: light?"rgba(0,0,0,0.05)":"rgba(255,255,255,0.05)",
  };
}

function Btn(bg){return{background:bg,border:"none",color:"#fff",padding:"6px 14px",borderRadius:8,cursor:"pointer",fontSize:12}}

function Particle(props){
  var dx=(props.mouseX-50)*0.3,dy=(props.mouseY-50)*0.3;
  return(
    <div style={{
      position:"absolute",left:props.x+"%",top:props.y+"%",width:props.size,height:props.size,
      borderRadius:"50%",background:props.color,opacity:props.light?0.15:0.4,
      filter:"blur("+(props.size/3)+"px)",
      transform:"translate("+(dx*(props.size/20))+"px,"+(dy*(props.size/20))+"px)",
      transition:"transform 0.8s ease-out",
      animation:"float "+(4+Math.random()*4)+"s ease-in-out "+props.delay+"s infinite alternate",
    }}/>
  );
}

function StatCard(props){
  var c=props.light;
  return(
    <div style={{background:c?"rgba(0,0,0,0.03)":"rgba(255,255,255,0.04)",borderRadius:12,padding:"16px 20px",border:"1px solid "+(c?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.08)"),flex:"1 1 140px",minWidth:140}}>
      <div style={{fontSize:24,fontWeight:700,color:props.color}}>{props.value}</div>
      <div style={{fontSize:13,opacity:0.5,marginTop:4}}>{props.label}</div>
    </div>
  );
}

function AdminDashboard(props){
  var quotes=props.quotes,sl=props.searchLog,c=props.light;
  var approved=quotes.filter(function(q){return q.status==="approved"});
  var pending=quotes.filter(function(q){return q.status==="pending"});
  var topics=[...new Set(approved.flatMap(function(q){return q.topics}))];
  var topQ=[...approved].sort(function(a,b){return b.views-a.views}).slice(0,5);
  var tc={};sl.forEach(function(s){tc[s]=(tc[s]||0)+1});
  var topS=Object.entries(tc).sort(function(a,b){return b[1]-a[1]}).slice(0,5);
  var bg=c?"rgba(0,0,0,0.02)":"rgba(255,255,255,0.03)";
  var bd="1px solid "+(c?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.06)");
  var rbd="1px solid "+(c?"rgba(0,0,0,0.05)":"rgba(255,255,255,0.05)");
  return(
    <div>
      <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:24}}>
        <StatCard label="Total Quotes" value={approved.length} color="#8b5cf6" light={c}/>
        <StatCard label="Topics" value={topics.length} color="#06b6d4" light={c}/>
        <StatCard label="Pending" value={pending.length} color="#f97316" light={c}/>
        <StatCard label="Total Views" value={approved.reduce(function(s,q){return s+q.views},0)} color="#10b981" light={c}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{background:bg,borderRadius:12,padding:16,border:bd}}>
          <h4 style={{margin:"0 0 12px",fontSize:14,opacity:0.6}}>Most Viewed</h4>
          {topQ.map(function(q,i){return(
            <div key={q.id} style={{padding:"8px 0",borderBottom:rbd,fontSize:13}}>
              <span style={{opacity:0.4,marginRight:8}}>#{i+1}</span>
              {'"'+q.text.slice(0,45)+'..."'} <span style={{opacity:0.4,float:"right"}}>{q.views} views</span>
            </div>
          )})}
          {topQ.length===0&&<p style={{opacity:0.3,fontSize:13}}>No data yet</p>}
        </div>
        <div style={{background:bg,borderRadius:12,padding:16,border:bd}}>
          <h4 style={{margin:"0 0 12px",fontSize:14,opacity:0.6}}>Top Searches</h4>
          {topS.map(function(e,i){return(
            <div key={e[0]} style={{padding:"8px 0",borderBottom:rbd,fontSize:13}}>
              <span style={{opacity:0.4,marginRight:8}}>#{i+1}</span>
              {e[0]} <span style={{opacity:0.4,float:"right"}}>{e[1]}x</span>
            </div>
          )})}
          {topS.length===0&&<p style={{opacity:0.3,fontSize:13}}>No searches yet</p>}
        </div>
      </div>
    </div>
  );
}

function QuoteManager(props){
  var quotes=props.quotes,setQuotes=props.setQuotes,light=props.light;
  var [filter,setFilter]=useState("");
  var [editing,setEditing]=useState(null);
  var [form,setForm]=useState({text:"",author:"",topics:""});
  var [showAdd,setShowAdd]=useState(false);
  var approved=quotes.filter(function(q){return q.status==="approved"});
  var filtered=filter?approved.filter(function(q){return q.text.toLowerCase().includes(filter.toLowerCase())||q.author.toLowerCase().includes(filter.toLowerCase())}):approved;
  var ibd="1px solid "+(light?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.12)");
  var iS={background:light?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.06)",border:ibd,borderRadius:8,padding:"8px 12px",color:light?"#1a1a2e":"#fff",fontSize:13,width:"100%",outline:"none"};
  var cbd="1px solid "+(light?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.06)");
  function doAdd(){
    if(!form.text.trim()||!form.author.trim())return;
    setQuotes([...quotes,{id:Date.now(),text:form.text.trim(),author:form.author.trim(),topics:form.topics.split(",").map(function(t){return t.trim().toLowerCase()}).filter(Boolean),views:0,favs:0,status:"approved"}]);
    setForm({text:"",author:"",topics:""});setShowAdd(false);
  }
  function doSave(id){
    setQuotes(quotes.map(function(q){return q.id===id?{...q,text:form.text.trim(),author:form.author.trim(),topics:form.topics.split(",").map(function(t){return t.trim().toLowerCase()}).filter(Boolean)}:q}));
    setEditing(null);setForm({text:"",author:"",topics:""});
  }
  return(
    <div>
      <div style={{display:"flex",gap:10,marginBottom:16,alignItems:"center"}}>
        <input placeholder="Filter..." value={filter} onChange={function(e){setFilter(e.target.value)}} style={{...iS,maxWidth:300}}/>
        <button onClick={function(){setShowAdd(!showAdd)}} style={Btn(showAdd?"rgba(120,120,120,0.3)":"#8b5cf6")}>{showAdd?"Cancel":"+ Add"}</button>
        <span style={{fontSize:13,opacity:0.4,marginLeft:"auto"}}>{filtered.length} quotes</span>
      </div>
      {showAdd&&(
        <div style={{background:light?"rgba(139,92,246,0.06)":"rgba(139,92,246,0.08)",borderRadius:12,padding:16,border:"1px solid rgba(139,92,246,0.2)",marginBottom:16}}>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <textarea placeholder="Quote text..." value={form.text} onChange={function(e){setForm({...form,text:e.target.value})}} style={{...iS,minHeight:60,resize:"vertical"}}/>
            <input placeholder="Author..." value={form.author} onChange={function(e){setForm({...form,author:e.target.value})}} style={iS}/>
            <input placeholder="Topics (comma separated)..." value={form.topics} onChange={function(e){setForm({...form,topics:e.target.value})}} style={iS}/>
            <button onClick={doAdd} style={Btn("#8b5cf6")}>Add Quote</button>
          </div>
        </div>
      )}
      <div style={{maxHeight:400,overflowY:"auto"}}>
        {filtered.map(function(q){return(
          <div key={q.id} style={{padding:14,background:light?"rgba(0,0,0,0.02)":"rgba(255,255,255,0.03)",borderRadius:10,border:cbd,marginBottom:8}}>
            {editing===q.id?(
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <textarea value={form.text} onChange={function(e){setForm({...form,text:e.target.value})}} style={{...iS,minHeight:50}}/>
                <input value={form.author} onChange={function(e){setForm({...form,author:e.target.value})}} style={iS}/>
                <input value={form.topics} onChange={function(e){setForm({...form,topics:e.target.value})}} style={iS}/>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={function(){doSave(q.id)}} style={Btn("#10b981")}>Save</button>
                  <button onClick={function(){setEditing(null)}} style={Btn("rgba(120,120,120,0.3)")}>Cancel</button>
                </div>
              </div>
            ):(
              <div>
                <div style={{fontSize:14,lineHeight:1.5,marginBottom:4}}>{'"'+q.text+'"'}</div>
                <div style={{fontSize:12,opacity:0.5}}>{"— "+q.author}</div>
                <div style={{marginTop:6,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                  {q.topics.map(function(t){return <span key={t} style={{fontSize:11,padding:"2px 8px",borderRadius:99,background:light?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.08)",opacity:0.7}}>{t}</span>})}
                  <span style={{marginLeft:"auto",fontSize:11,opacity:0.3}}>{q.views} views</span>
                  <button onClick={function(){setEditing(q.id);setForm({text:q.text,author:q.author,topics:q.topics.join(", ")})}} style={Btn("rgba(120,120,120,0.3)")}>Edit</button>
                  <button onClick={function(){if(window.confirm("Delete?"))setQuotes(quotes.filter(function(x){return x.id!==q.id}))}} style={Btn("rgba(239,68,68,0.3)")}>Delete</button>
                </div>
              </div>
            )}
          </div>
        )})}
      </div>
    </div>
  );
}

function TopicManager(props){
  var quotes=props.quotes,setQuotes=props.setQuotes,moods=props.moods,light=props.light;
  var topics={};
  quotes.filter(function(q){return q.status==="approved"}).forEach(function(q){q.topics.forEach(function(t){topics[t]=(topics[t]||0)+1})});
  var sorted=Object.entries(topics).sort(function(a,b){return b[1]-a[1]});
  var [renaming,setRenaming]=useState(null);
  var [renameVal,setRenameVal]=useState("");
  var ibd="1px solid "+(light?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.12)");
  var iS={background:light?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.06)",border:ibd,borderRadius:8,padding:"6px 12px",color:light?"#1a1a2e":"#fff",fontSize:13,outline:"none"};
  function doRename(topic){
    var n=renameVal.trim().toLowerCase();
    if(n&&n!==topic)setQuotes(quotes.map(function(q){return{...q,topics:q.topics.map(function(t){return t===topic?n:t})}}));
    setRenaming(null);
  }
  return(
    <div>
      <h4 style={{margin:"0 0 16px",fontSize:14,opacity:0.6}}>Topics ({sorted.length})</h4>
      <div style={{maxHeight:300,overflowY:"auto",marginBottom:16}}>
        {sorted.map(function(entry){
          var topic=entry[0],count=entry[1];
          var rbd="1px solid "+(light?"rgba(0,0,0,0.05)":"rgba(255,255,255,0.05)");
          return(
            <div key={topic} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:light?"rgba(0,0,0,0.02)":"rgba(255,255,255,0.03)",borderRadius:8,marginBottom:4,border:rbd}}>
              {renaming===topic?(
                <>
                  <input value={renameVal} onChange={function(e){setRenameVal(e.target.value)}} onKeyDown={function(e){if(e.key==="Enter")doRename(topic)}} style={iS} autoFocus/>
                  <button onClick={function(){doRename(topic)}} style={Btn("#10b981")}>Save</button>
                  <button onClick={function(){setRenaming(null)}} style={Btn("rgba(120,120,120,0.3)")}>✕</button>
                </>
              ):(
                <>
                  <span style={{fontSize:14,flex:1}}>{topic}</span>
                  <span style={{fontSize:12,opacity:0.4}}>{count} quotes</span>
                  <button onClick={function(){setRenaming(topic);setRenameVal(topic)}} style={Btn("rgba(120,120,120,0.3)")}>Rename</button>
                  <button onClick={function(){if(window.confirm("Remove "+topic+"?"))setQuotes(quotes.map(function(q){return{...q,topics:q.topics.filter(function(t){return t!==topic})}}))}} style={Btn("rgba(239,68,68,0.3)")}>Delete</button>
                </>
              )}
            </div>
          );
        })}
      </div>
      <h4 style={{margin:"0 0 12px",fontSize:14,opacity:0.6}}>Mood Categories</h4>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {Object.entries(moods).filter(function(e){return e[0]!=="all"}).map(function(e){
          return <div key={e[0]} style={{padding:"8px 16px",borderRadius:99,fontSize:13,background:"linear-gradient(135deg,"+e[1].gradient.join(",")+")",opacity:0.8,color:"#fff"}}>{e[1].label}</div>
        })}
      </div>
    </div>
  );
}

function ModerationQueue(props){
  var quotes=props.quotes,setQuotes=props.setQuotes,light=props.light;
  var pending=quotes.filter(function(q){return q.status==="pending"});
  var [editId,setEditId]=useState(null);
  var [ef,setEf]=useState({text:"",author:"",topics:""});
  var ibd="1px solid "+(light?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.12)");
  var iS={background:light?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.06)",border:ibd,borderRadius:8,padding:"8px 12px",color:light?"#1a1a2e":"#fff",fontSize:13,width:"100%",outline:"none"};
  if(pending.length===0)return <div style={{textAlign:"center",padding:40,opacity:0.4}}><div style={{fontSize:32,marginBottom:8}}>✓</div><div>No pending submissions</div></div>;
  return(
    <div>
      <p style={{fontSize:13,opacity:0.5,marginBottom:12}}>{pending.length} pending</p>
      {pending.map(function(q){return(
        <div key={q.id} style={{padding:16,background:light?"rgba(249,115,22,0.05)":"rgba(249,115,22,0.06)",borderRadius:12,border:"1px solid rgba(249,115,22,0.15)",marginBottom:10}}>
          {editId===q.id?(
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <textarea value={ef.text} onChange={function(e){setEf({...ef,text:e.target.value})}} style={{...iS,minHeight:50}}/>
              <input value={ef.author} onChange={function(e){setEf({...ef,author:e.target.value})}} style={iS}/>
              <input value={ef.topics} onChange={function(e){setEf({...ef,topics:e.target.value})}} style={iS}/>
              <div style={{display:"flex",gap:8}}>
                <button onClick={function(){setQuotes(quotes.map(function(x){return x.id===q.id?{...x,text:ef.text,author:ef.author,topics:ef.topics.split(",").map(function(t){return t.trim().toLowerCase()}).filter(Boolean),status:"approved"}:x}));setEditId(null)}} style={Btn("#10b981")}>Save & Approve</button>
                <button onClick={function(){setEditId(null)}} style={Btn("rgba(120,120,120,0.3)")}>Cancel</button>
              </div>
            </div>
          ):(
            <div>
              <div style={{fontSize:14,lineHeight:1.5,marginBottom:4}}>{'"'+q.text+'"'}</div>
              <div style={{fontSize:12,opacity:0.5}}>{"— "+q.author}</div>
              <div style={{marginTop:10,display:"flex",gap:8}}>
                <button onClick={function(){setQuotes(quotes.map(function(x){return x.id===q.id?{...x,status:"approved"}:x}))}} style={Btn("#10b981")}>Approve</button>
                <button onClick={function(){setEditId(q.id);setEf({text:q.text,author:q.author,topics:q.topics.join(", ")})}} style={Btn("rgba(120,120,120,0.3)")}>Edit</button>
                <button onClick={function(){setQuotes(quotes.filter(function(x){return x.id!==q.id}))}} style={Btn("rgba(239,68,68,0.3)")}>Reject</button>
              </div>
            </div>
          )}
        </div>
      )})}
    </div>
  );
}

function LoginModal(props){
  var light=props.light;
  var [form,setForm]=useState({username:"",password:""});
  var [error,setError]=useState("");
  var ibd="1px solid "+(light?"rgba(0,0,0,0.12)":"rgba(255,255,255,0.15)");
  var iS={background:light?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.06)",border:ibd,borderRadius:10,padding:"10px 14px",color:light?"#1a1a2e":"#fff",fontSize:14,width:"100%",outline:"none"};
  function handle(){
    if(form.username===ADMIN.username&&form.password===ADMIN.password)props.onLogin();
    else{setError("Invalid credentials");setTimeout(function(){setError("")},3000)}
  }
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,backdropFilter:"blur(8px)"}} onClick={props.onClose}>
      <div onClick={function(e){e.stopPropagation()}} style={{background:light?"#fff":"#1a1528",borderRadius:16,padding:28,width:"90%",maxWidth:380,border:"1px solid "+(light?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.1)"),animation:"fadeSlideIn 0.3s ease",boxShadow:light?"0 20px 60px rgba(0,0,0,0.15)":"none"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:36,marginBottom:8}}>🔐</div>
          <h3 style={{margin:0,fontSize:18}}>Admin Login</h3>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <input placeholder="Username" value={form.username} onChange={function(e){setForm({...form,username:e.target.value})}} onKeyDown={function(e){if(e.key==="Enter")handle()}} style={iS} autoFocus/>
          <input placeholder="Password" type="password" value={form.password} onChange={function(e){setForm({...form,password:e.target.value})}} onKeyDown={function(e){if(e.key==="Enter")handle()}} style={iS}/>
          {error&&<div style={{color:"#ef4444",fontSize:13,textAlign:"center"}}>{error}</div>}
          <button onClick={handle} style={{padding:"10px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#8b5cf6,#6366f1)",color:"#fff",fontSize:14,cursor:"pointer",fontWeight:600}}>Log In</button>
          <button onClick={props.onClose} style={{padding:"8px",borderRadius:10,border:"1px solid "+(light?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.1)"),background:"transparent",color:light?"#666":"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function SubmitModal(props){
  var light=props.light;
  var [form,setForm]=useState({text:"",author:"",topics:""});
  var ibd="1px solid "+(light?"rgba(0,0,0,0.12)":"rgba(255,255,255,0.15)");
  var iS={background:light?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.06)",border:ibd,borderRadius:10,padding:"10px 14px",color:light?"#1a1a2e":"#fff",fontSize:14,width:"100%",outline:"none"};
  function handle(){
    if(!form.text.trim()||!form.author.trim())return;
    props.onSubmit({id:Date.now(),text:form.text.trim(),author:form.author.trim(),topics:form.topics.split(",").map(function(t){return t.trim().toLowerCase()}).filter(Boolean),views:0,favs:0,status:"pending"});
    props.onClose();
  }
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,backdropFilter:"blur(8px)"}} onClick={props.onClose}>
      <div onClick={function(e){e.stopPropagation()}} style={{background:light?"#fff":"#1a1528",borderRadius:16,padding:28,width:"90%",maxWidth:440,border:"1px solid "+(light?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.1)"),boxShadow:light?"0 20px 60px rgba(0,0,0,0.15)":"none"}}>
        <h3 style={{margin:"0 0 16px",fontSize:18}}>Submit a Quote</h3>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <textarea placeholder="Your favorite quote..." value={form.text} onChange={function(e){setForm({...form,text:e.target.value})}} style={{...iS,minHeight:70}}/>
          <input placeholder="Author" value={form.author} onChange={function(e){setForm({...form,author:e.target.value})}} style={iS}/>
          <input placeholder="Topics (comma separated)" value={form.topics} onChange={function(e){setForm({...form,topics:e.target.value})}} style={iS}/>
          <div style={{display:"flex",gap:10,marginTop:4}}>
            <button onClick={handle} style={{flex:1,padding:"10px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#8b5cf6,#6366f1)",color:"#fff",fontSize:14,cursor:"pointer",fontWeight:600}}>Submit for Review</button>
            <button onClick={props.onClose} style={{padding:"10px 20px",borderRadius:10,border:"1px solid "+(light?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.15)"),background:"transparent",color:light?"#666":"#fff",fontSize:14,cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Quotify(){
  var [quotes,setQuotes]=useState(defaultQuotes);
  var [light,setLight]=useState(false);
  var moodsData=light?lightMoods:darkMoods;
  var [mood,setMood]=useState("all");
  var [current,setCurrent]=useState(null);
  var [favorites,setFavorites]=useState([]);
  var [showFavs,setShowFavs]=useState(false);
  var [search,setSearch]=useState("");
  var [suggestions,setSuggestions]=useState([]);
  var [animKey,setAnimKey]=useState(0);
  var [mousePos,setMousePos]=useState({x:50,y:50});
  var [typing,setTyping]=useState(false);
  var [typedText,setTypedText]=useState("");
  var [copied,setCopied]=useState(false);
  var [searchResults,setSearchResults]=useState(null);
  var [view,setView]=useState("explore");
  var [adminTab,setAdminTab]=useState("dashboard");
  var [searchLog,setSearchLog]=useState([]);
  var [showSubmit,setShowSubmit]=useState(false);
  var [isAdmin,setIsAdmin]=useState(false);
  var [showLogin,setShowLogin]=useState(false);
  var [showDaily,setShowDaily]=useState(true);
  var containerRef=useRef(null);

  var tc=useThemeColors(light);
  var approvedQuotes=useMemo(function(){return quotes.filter(function(q){return q.status==="approved"})},[quotes]);
  var allTopics=useMemo(function(){return[...new Set(approvedQuotes.flatMap(function(q){return q.topics}))].sort()},[approvedQuotes]);
  var dailyQuote=useMemo(function(){return getDailyQuote(quotes)},[quotes]);
  var particles=useMemo(function(){return Array.from({length:25},function(_,i){return{id:i,x:Math.random()*100,y:Math.random()*100,size:4+Math.random()*30,delay:Math.random()*3}})},[]);

  var moodData=moodsData[mood];
  var grad="linear-gradient(135deg,"+moodData.gradient.join(",")+")";

  var getFiltered=useCallback(function(m,s){
    var f=approvedQuotes;
    if(m!=="all")f=f.filter(function(q){return q.topics.includes(m)});
    if(s)f=f.filter(function(q){return q.topics.some(function(t){return t.includes(s.toLowerCase())})||q.text.toLowerCase().includes(s.toLowerCase())||q.author.toLowerCase().includes(s.toLowerCase())});
    return f.length?f:approvedQuotes;
  },[approvedQuotes]);

  var pickRandom=useCallback(function(m,s){
    m=m||mood;s=s||"";
    var pool=getFiltered(m,s);
    var q=pool[Math.floor(Math.random()*pool.length)];
    setCurrent(q);setAnimKey(function(k){return k+1});setTyping(true);setTypedText("");
    setQuotes(function(prev){return prev.map(function(pq){return pq.id===q.id?{...pq,views:pq.views+1}:pq})});
  },[mood,getFiltered]);

  useEffect(function(){pickRandom()},[]);

  useEffect(function(){
    if(!typing||!current)return;
    var i=0;
    var iv=setInterval(function(){i++;setTypedText(current.text.slice(0,i));if(i>=current.text.length){clearInterval(iv);setTyping(false)}},28);
    return function(){clearInterval(iv)};
  },[typing,current,animKey]);

  useEffect(function(){
    if(search.length>0)setSuggestions(allTopics.filter(function(t){return t.includes(search.toLowerCase())}).slice(0,5));
    else setSuggestions([]);
  },[search,allTopics]);

  var handleMouse=useCallback(function(e){
    if(!containerRef.current)return;
    var r=containerRef.current.getBoundingClientRect();
    setMousePos({x:((e.clientX-r.left)/r.width)*100,y:((e.clientY-r.top)/r.height)*100});
  },[]);

  function toggleFav(){
    if(!current)return;
    var isFaved=favorites.some(function(q){return q.id===current.id});
    setFavorites(function(f){return isFaved?f.filter(function(q){return q.id!==current.id}):[...f,current]});
    setQuotes(function(prev){return prev.map(function(q){return q.id===current.id?{...q,favs:q.favs+(isFaved?-1:1)}:q})});
  }
  var isFav=current&&favorites.some(function(q){return q.id===current.id});
  function handleSearch(term){setSearchResults(getFiltered(mood,term));setSearch(term);setSuggestions([]);setSearchLog(function(prev){return[...prev,term.toLowerCase()]})}
  function clearSearch(){setSearch("");setSearchResults(null);setSuggestions([])}
  function copyQuote(){if(!current)return;navigator.clipboard.writeText('"'+current.text+'" — '+current.author);setCopied(true);setTimeout(function(){setCopied(false)},2000)}

  var adminTabs=[
    {key:"dashboard",label:"Dashboard"},
    {key:"quotes",label:"Quotes"},
    {key:"topics",label:"Topics & Moods"},
    {key:"moderation",label:"Moderation ("+quotes.filter(function(q){return q.status==="pending"}).length+")"},
  ];

  var cssText = [
    "@keyframes float{0%{transform:translateY(0)}100%{transform:translateY(-20px)}}",
    "@keyframes fadeSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}",
    "@keyframes fadeIn{from{opacity:0}to{opacity:1}}",
    "@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}",
    "@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}",
    "@keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}",
    "@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(139,92,246,0.15)}50%{box-shadow:0 0 40px rgba(139,92,246,0.3)}}",
    "*{box-sizing:border-box}",
    ".m-btn{padding:8px 18px;border-radius:99px;border:1px solid "+tc.border+";background:"+tc.cardBg+";color:"+tc.fg+";cursor:pointer;font-size:14px;transition:all .3s}",
    ".m-btn:hover{background:"+tc.hoverBg+";transform:scale(1.05)}",
    ".m-btn.active{border-color:transparent;font-weight:600;color:#fff}",
    ".s-input{background:"+tc.cardBg+";border:1px solid "+tc.border+";border-radius:99px;padding:10px 20px;color:"+tc.fg+";font-size:15px;outline:none;width:100%;max-width:400px;transition:all .3s}",
    ".s-input::placeholder{color:"+tc.fgSoft+"}",
    ".s-input:focus{border-color:"+(light?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.4)")+"}",
    ".sug{padding:8px 16px;cursor:pointer;transition:all .2s;border-radius:8px}",
    ".sug:hover{background:"+tc.hoverBg+"}",
    ".tag{display:inline-block;padding:4px 12px;border-radius:99px;font-size:12px;background:"+tc.cardBg+";margin:3px;cursor:pointer;transition:all .3s;border:1px solid "+tc.cardBdr+"}",
    ".tag:hover{background:"+tc.hoverBg+";transform:scale(1.05)}",
    ".abtn{width:48px;height:48px;border-radius:50%;border:1px solid "+tc.border+";background:"+tc.cardBg+";color:"+tc.fg+";cursor:pointer;font-size:20px;display:flex;align-items:center;justify-content:center;transition:all .3s;position:relative}",
    ".abtn:hover{background:"+tc.hoverBg+";transform:scale(1.1)}",
    ".fav-i{padding:16px;background:"+tc.cardBg+";border-radius:12px;margin-bottom:10px;border:1px solid "+tc.cardBdr+";cursor:pointer;transition:all .3s}",
    ".fav-i:hover{background:"+tc.hoverBg+";transform:translateX(4px)}",
    ".res-c{padding:16px;background:"+tc.cardBg+";border-radius:12px;margin-bottom:8px;border:1px solid "+tc.cardBdr+";cursor:pointer;transition:all .3s;animation:fadeSlideIn .4s ease forwards}",
    ".res-c:hover{background:"+tc.hoverBg+"}",
    ".atab{padding:8px 16px;border-radius:8px;border:none;color:"+tc.fg+";cursor:pointer;font-size:13px;transition:all .2s;background:transparent;opacity:0.5}",
    ".atab:hover{opacity:0.8;background:"+tc.cardBg+"}",
    ".atab.active{opacity:1;background:"+tc.cardBg+"}",
    "@media(max-width:640px){.hide-mobile{display:none!important}.admin-grid{grid-template-columns:1fr!important}}",
  ].join("\n");

  return(
    <div ref={containerRef} onMouseMove={handleMouse} style={{
      minHeight:"100vh",background:view==="admin"?(light?"#f5f3ff":"#0c0917"):moodData.bg,
      color:tc.fg,fontFamily:"'Segoe UI',system-ui,-apple-system,sans-serif",
      overflow:"hidden",position:"relative",transition:"background 0.6s ease,color 0.6s ease",
    }}>
      <style>{cssText}</style>

      {view==="explore"&&particles.map(function(p){return(
        <Particle key={p.id} x={p.x} y={p.y} size={p.size} delay={p.delay} color={moodData.gradient[p.id%3]} mouseX={mousePos.x} mouseY={mousePos.y} light={light}/>
      )})}
      {view==="explore"&&(
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:grad,opacity:light?0.04:0.08,filter:"blur(100px)",left:(mousePos.x-10)+"%",top:(mousePos.y-10)+"%",transition:"left 1s ease-out,top 1s ease-out",pointerEvents:"none"}}/>
      )}

      <div style={{position:"relative",zIndex:10,padding:"24px 16px",maxWidth:800,margin:"0 auto"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
          <h1 onClick={function(){setView("explore")}} style={{fontSize:30,fontWeight:800,margin:0,letterSpacing:-1,cursor:"pointer",background:grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"200% auto",animation:"shimmer 4s linear infinite"}}>
            ✦ Quotify
          </h1>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            <button onClick={function(){setLight(!light)}} style={{width:40,height:40,borderRadius:99,border:"1px solid "+tc.border,background:tc.cardBg,color:tc.fg,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s"}} title={light?"Dark mode":"Light mode"}>
              {light?"🌙":"☀️"}
            </button>
            {view==="explore"&&(
              <button onClick={function(){setShowSubmit(true)}} style={{padding:"8px 14px",borderRadius:99,border:"1px solid "+tc.border,background:tc.cardBg,color:tc.fg,cursor:"pointer",fontSize:13}}>Submit</button>
            )}
            {view==="admin"&&isAdmin&&(
              <button onClick={function(){setIsAdmin(false);setView("explore")}} style={{padding:"8px 14px",borderRadius:99,border:"1px solid rgba(239,68,68,0.3)",background:"rgba(239,68,68,0.1)",color:light?"#dc2626":"#fff",cursor:"pointer",fontSize:13}}>Logout</button>
            )}
            <button onClick={function(){
              if(view==="admin")setView("explore");
              else if(isAdmin)setView("admin");
              else setShowLogin(true);
            }} style={{padding:"8px 14px",borderRadius:99,border:"1px solid "+tc.border,background:view==="admin"?"rgba(139,92,246,0.2)":tc.cardBg,color:tc.fg,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:6}}>
              {view==="admin"?"← Explore":<><span style={{fontSize:14}}>🔒</span><span className="hide-mobile">Admin</span></>}
            </button>
          </div>
        </div>

        {view==="admin"?(
          <div style={{animation:"fadeSlideIn 0.4s ease"}}>
            <div style={{display:"flex",gap:4,marginBottom:20,borderBottom:"1px solid "+tc.cardBdr,paddingBottom:12,overflowX:"auto"}}>
              {adminTabs.map(function(t){return(
                <button key={t.key} className={"atab"+(adminTab===t.key?" active":"")} onClick={function(){setAdminTab(t.key)}}>{t.label}</button>
              )})}
            </div>
            {adminTab==="dashboard"&&<AdminDashboard quotes={quotes} searchLog={searchLog} light={light}/>}
            {adminTab==="quotes"&&<QuoteManager quotes={quotes} setQuotes={setQuotes} light={light}/>}
            {adminTab==="topics"&&<TopicManager quotes={quotes} setQuotes={setQuotes} moods={moodsData} light={light}/>}
            {adminTab==="moderation"&&<ModerationQueue quotes={quotes} setQuotes={setQuotes} light={light}/>}
          </div>
        ):(
          <>
            {/* Daily Quote */}
            {showDaily&&dailyQuote&&(
              <div style={{background:light?"rgba(99,102,241,0.06)":"rgba(99,102,241,0.1)",borderRadius:14,padding:"14px 18px",marginBottom:20,border:"1px solid "+(light?"rgba(99,102,241,0.12)":"rgba(99,102,241,0.2)"),animation:"slideDown 0.5s ease",position:"relative"}}>
                <button onClick={function(){setShowDaily(false)}} style={{position:"absolute",top:10,right:14,background:"none",border:"none",color:tc.fgSoft,cursor:"pointer",fontSize:16}}>✕</button>
                <div style={{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:1.5,opacity:0.5,marginBottom:8}}>✦ Quote of the Day</div>
                <div style={{fontSize:16,lineHeight:1.5,fontStyle:"italic"}}>{'"'+dailyQuote.text+'"'}</div>
                <div style={{fontSize:13,opacity:0.5,marginTop:6}}>{"— "+dailyQuote.author}</div>
              </div>
            )}

            {/* Search */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:20,position:"relative"}}>
              <div style={{position:"relative",width:"100%",maxWidth:400}}>
                <input className="s-input" placeholder="Search topics, words, or authors..." value={search} onChange={function(e){setSearch(e.target.value)}} onKeyDown={function(e){if(e.key==="Enter")handleSearch(search)}} style={{width:"100%"}}/>
                {search&&<button onClick={clearSearch} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:tc.fgSoft,cursor:"pointer",fontSize:18}}>✕</button>}
                {suggestions.length>0&&(
                  <div style={{position:"absolute",top:"110%",left:0,right:0,background:light?"#fff":"rgba(15,10,30,0.95)",borderRadius:12,padding:6,border:"1px solid "+tc.cardBdr,backdropFilter:"blur(20px)",zIndex:20,boxShadow:light?"0 8px 30px rgba(0,0,0,0.1)":"none"}}>
                    {suggestions.map(function(s){return <div key={s} className="sug" onClick={function(){handleSearch(s)}}>{"🔍 "+s}</div>})}
                  </div>
                )}
              </div>
            </div>

            {/* Mood pills */}
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8,marginBottom:28}}>
              {Object.entries(moodsData).map(function(entry){
                var key=entry[0],m=entry[1];
                return <button key={key} className={"m-btn"+(mood===key?" active":"")} style={mood===key?{background:grad}:{}} onClick={function(){setMood(key);clearSearch();pickRandom(key,"")}}>{m.label}</button>
              })}
            </div>

            {searchResults?(
              <div style={{marginBottom:20,animation:"fadeIn 0.3s ease"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <span style={{fontSize:14,opacity:0.5}}>{searchResults.length+' results for "'+search+'"'}</span>
                  <button onClick={clearSearch} style={{background:tc.cardBg,border:"1px solid "+tc.cardBdr,color:tc.fg,padding:"6px 14px",borderRadius:99,cursor:"pointer",fontSize:13}}>Back</button>
                </div>
                <div style={{maxHeight:400,overflowY:"auto"}}>
                  {searchResults.map(function(q,i){return(
                    <div key={i} className="res-c" onClick={function(){setCurrent(q);setAnimKey(function(k){return k+1});setTyping(true);setTypedText("");setSearchResults(null);setSearch("");setQuotes(function(prev){return prev.map(function(pq){return pq.id===q.id?{...pq,views:pq.views+1}:pq})})}}>
                      <div style={{fontSize:15,lineHeight:1.5,marginBottom:6}}>{'"'+q.text+'"'}</div>
                      <div style={{fontSize:13,opacity:0.5}}>{"— "+q.author}</div>
                      <div style={{marginTop:6}}>{q.topics.map(function(t){return <span key={t} className="tag">{t}</span>})}</div>
                    </div>
                  )})}
                </div>
              </div>
            ):(
              <>
                {current&&(
                  <div key={animKey} style={{textAlign:"center",margin:"16px 0 28px",animation:"fadeSlideIn 0.6s ease"}}>
                    <div style={{fontSize:"clamp(20px,5vw,28px)",fontWeight:300,lineHeight:1.5,maxWidth:600,margin:"0 auto 16px",minHeight:80,padding:"0 8px"}}>
                      {'"'+typedText+'"'}{typing&&<span style={{animation:"pulse 1s infinite",opacity:0.5}}>|</span>}
                    </div>
                    <div style={{fontSize:16,opacity:typing?0:0.6,transition:"opacity 0.5s",fontStyle:"italic"}}>{"— "+current.author}</div>
                    <div style={{marginTop:12,opacity:typing?0:1,transition:"opacity 0.5s 0.2s"}}>
                      {current.topics.map(function(t){return <span key={t} className="tag" onClick={function(){handleSearch(t)}}>{t}</span>})}
                    </div>
                  </div>
                )}
                <div style={{display:"flex",justifyContent:"center",gap:14,marginBottom:28}}>
                  <button className="abtn" onClick={function(){pickRandom()}} title="New quote" style={{animation:"glow 3s ease-in-out infinite"}}>✦</button>
                  <button className="abtn" onClick={toggleFav} title="Favorite" style={isFav?{background:"rgba(236,72,153,0.3)",borderColor:"rgba(236,72,153,0.5)"}:{}}>{isFav?"♥":"♡"}</button>
                  <button className="abtn" onClick={copyQuote} title="Copy">{copied?"✓":"⎘"}</button>
                  <button className="abtn" onClick={function(){setShowFavs(!showFavs)}} title="Favorites" style={showFavs?{background:tc.hoverBg}:{}}>
                    ☆{favorites.length>0&&<span style={{fontSize:11,position:"absolute",top:-4,right:-4,background:grad,borderRadius:99,padding:"2px 6px",color:"#fff"}}>{favorites.length}</span>}
                  </button>
                </div>
              </>
            )}

            {showFavs&&(
              <div style={{background:tc.cardBg,borderRadius:16,padding:20,border:"1px solid "+tc.cardBdr,animation:"fadeSlideIn 0.4s ease"}}>
                <h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:600}}>{"♥ Saved ("+favorites.length+")"}</h3>
                {favorites.length===0?<p style={{opacity:0.4,fontSize:14}}>Tap the heart to save quotes.</p>:
                  favorites.map(function(q,i){return(
                    <div key={i} className="fav-i" onClick={function(){setCurrent(q);setAnimKey(function(k){return k+1});setTyping(true);setTypedText("");setShowFavs(false)}}>
                      <div style={{fontSize:14,lineHeight:1.5}}>{'"'+q.text+'"'}</div>
                      <div style={{fontSize:12,opacity:0.5,marginTop:4}}>{"— "+q.author}</div>
                    </div>
                  )})}
              </div>
            )}
          </>
        )}
      </div>

      {showSubmit&&<SubmitModal onSubmit={function(q){setQuotes(function(prev){return[...prev,q]})}} onClose={function(){setShowSubmit(false)}} light={light}/>}
      {showLogin&&<LoginModal onLogin={function(){setIsAdmin(true);setShowLogin(false);setView("admin")}} onClose={function(){setShowLogin(false)}} light={light}/>}
    </div>
  );
}