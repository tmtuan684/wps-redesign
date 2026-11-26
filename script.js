{
const stops=[
 {n:"Learn",l:"Remember · Understand",t:"Pre-class reading and a short lecture with live demo of the fundamentals."},
 {n:"Rehearse",l:"Understand · Apply",t:"Practice exercises in the session's learning lab, with live code editors."},
 {n:"Apply",l:"Apply",t:"Small applications that put several ideas together in one working piece."},
 {n:"Extend",l:"Analyse · Evaluate · Create",t:"Each student builds the idea into their own module of the group project."}
];
document.getElementById('stops').innerHTML=stops.map(s=>`<div class="stop"><div class="lvl">${s.l}</div><h3>${s.n}</h3><p>${s.t}</p></div>`).join('');

const steps=[
 ["Before class","Pre-class reading","Short reading linked from the session's learning lab."],
 ["Opening","Code quiz","A few questions built on real source code. Completion counts."],
 ["Teach","Lecture and demo","The concept, shown working, step by step."],
 ["Practise","Practice exercises","Guided exercises in the learning lab, from easy to harder."],
 ["Apply","Application exercises","Advanced tasks and small applications."],
 ["Last 15 min","My project module","Each student applies today's topic to their own part of the group project. No general discussion."],
 ["After class","Self-regulated learning","Students finish exercises and push their project forward on their own."]
];
document.getElementById('steps').innerHTML=steps.map(s=>`<li><div class="when">${s[0]}</div><div><b>${s[1]}</b><span>${s[2]}</span></div></li>`).join('');

const wants=[
 ["One learning lab page per session","Standalone HTML pages with knowledge, examples and live code editors, uploaded to Canvas."],
 ["A visible journey","Students should see Learn → Rehearse → Apply → Extend in every module."],
 ["Quiz completion tracked","So the 5% can be recorded without extra marking."],
 ["A clear home for the project","A space where each student's module and the team's progress live together."]
];
document.getElementById('wants').innerHTML=wants.map(w=>`<li><b>${w[0]}</b><span>${w[1]}</span></li>`).join('');

const mods=[
 {h:"Week 1 · Session 1 — Structure a page",s:"semantic HTML",items:[["R","Pre-class reading","Page"],["Q","Opening code quiz","Quiz · completion"],["L","Learning lab: semantic HTML","HTML page"],["P","Practice exercises","In the lab"],["A","Application exercises","In the lab"],["M","My project module","Assignment"]]},
 {h:"Week 1 · Session 2",s:"same pattern",items:[["…","Reading, quiz, lab, exercises, project module",""]]}
];
document.getElementById('mods').innerHTML=mods.map(m=>`<div class="mod"><h4>${m.h}<small>${m.s}</small></h4>${m.items.map(i=>`<div class="item"><div class="ic">${i[0]}</div><div>${i[1]}</div><div class="tag">${i[2]}</div></div>`).join('')}</div>`).join('');

const bars=[["Individual lab test",40],["Assessment 1",15],["Session-opening quizzes",5]];
document.getElementById('bars').innerHTML=bars.map(b=>`<div class="bar"><div>${b[0]}</div><div class="track"><div style="width:${b[1]/40*100}%"></div></div><div class="v">${b[1]}%</div></div>`).join('')+'<div class="note">Only the components that change, or stay fixed, are shown here.</div>';

const qs=[
 ["Module structure","Should modules be organised by week, or by capability topic?"],
 ["Hosting the learning labs","What's the best way to embed or link standalone HTML pages so they work well in Canvas?"],
 ["Showing progress","Can Canvas requirements or prerequisites make the four steps visible and trackable?"],
 ["Group work fairness","How can the shell help show each student's own contribution to the project?"],
 ["Supporting SRL","Where can planning and reflection prompts sit so students actually use them between classes?"],
 ["Pilot first","Can we build Week 1 Session 1 together as the template for the rest?"]
];
document.getElementById('qs').innerHTML=qs.map(q=>`<li><b>${q[0]}</b><span>${q[1]}</span></li>`).join('');

const s=document.getElementById('sv');
const draw=()=>{
 const W=s.clientWidth,H=s.clientHeight,small=W<520;
 const lv=["Remember","Understand","Apply","Analyse","Evaluate","Create"];
 const top=24,bot=H-40,left=small?8:120,right=W-24;
 const y=i=>bot-(bot-top)*(i/(lv.length-1));
 let g='';
 lv.forEach((n,i)=>{g+=`<line x1="${left}" x2="${right}" y1="${y(i)}" y2="${y(i)}" stroke="var(--line)"/>`;
  if(!small)g+=`<text x="${left-12}" y="${y(i)+5}" text-anchor="end" font-size="13" fill="var(--soft)">${n}</text>`;});
 g+=`<rect x="${left}" y="${y(5)-8}" width="${right-left}" height="${y(2)-y(5)+16}" fill="var(--redsoft)" opacity=".6"/>`;
 if(!small)g+=`<text x="${right-8}" y="${y(5)+18}" text-anchor="end" font-size="13" fill="var(--red)">through the group project</text>`;
 const pts=[[0.08,0.6],[0.36,1.4],[0.64,2],[0.92,4.6]].map(p=>[left+(right-left)*p[0],y(p[1])]);
 let d=`M${pts[0][0]},${pts[0][1]}`;
 for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],mx=(a[0]+b[0])/2;d+=` C${mx},${a[1]} ${mx},${b[1]} ${b[0]},${b[1]}`;}
 g+=`<path id="path" d="${d}" fill="none" stroke="var(--red)" stroke-width="5" stroke-linecap="round"/>`;
 pts.forEach((p,i)=>{g+=`<circle cx="${p[0]}" cy="${p[1]+4}" r="17" fill="rgba(0,0,0,.12)"/><circle cx="${p[0]}" cy="${p[1]}" r="16" fill="var(--bg)" stroke="var(--red)" stroke-width="4"/><circle cx="${p[0]}" cy="${p[1]}" r="6" fill="var(--red)"/>`;
  const lx=Math.min(Math.max(p[0],40),W-40);
  g+=`<text x="${lx}" y="${p[1]+(i===3?-28:38)}" text-anchor="middle" font-size="${small?14:16}" font-weight="600" fill="var(--ink)">${stops[i].n}</text>`;});
 s.innerHTML=g;
 const pe=s.querySelector('#path');if(pe)pe.style.setProperty('--len',pe.getTotalLength());
};
const ro=new ResizeObserver(draw);ro.observe(s);
}
