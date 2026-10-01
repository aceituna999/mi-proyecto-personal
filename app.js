const KEY="miproyecto_v1";
const defaultData={weight:89,water:0,sleep:null,habits:{wake:false,workout:false,meals:false,water:false,night:false,sleep:false},workouts:{},waist:null,weightLog:[]};
function getData(){return JSON.parse(localStorage.getItem(KEY)||JSON.stringify(defaultData))}
function saveData(d){localStorage.setItem(KEY,JSON.stringify(d))}
function dateKey(){return new Date().toISOString().slice(0,10)}
function dayName(){return ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"][new Date().getDay()]}
function workoutForToday(){return ["Descanso","Tren superior + abdomen","Piernas + glúteos","Espalda + postura + abdomen","Tren superior + abdomen","Piernas + glúteos","Cardio + movilidad"][new Date().getDay()]}
function renderHome(){
 const d=getData(), h=d.habits;
 document.getElementById("today").textContent=`${dayName()}, ${new Date().toLocaleDateString("es-PE",{day:"numeric",month:"long",year:"numeric"})}`;
 document.getElementById("weightStat").textContent=`${Number(d.weight||89).toFixed(1)} kg`;
 document.getElementById("waterStat").textContent=`${Number(d.water||0).toFixed(1)} / 3.0 L`;
 document.getElementById("sleepStat").textContent=d.sleep?`${d.sleep} h`:"—";
 const rest=new Date().getDay()===0;
 document.getElementById("workoutStat").textContent=rest?"Descanso":(h.workout?"Completado":"Pendiente");
 document.getElementById("quickWorkout").textContent=workoutForToday();
 const list=[["wake","Levantarse a las 6:00"],["workout",rest?"Descanso programado":"Entrenamiento"],["meals","Cumplir las 3 comidas"],["water","Llegar a la meta de agua"],["night","Rutina nocturna"],["sleep","Dormir a las 10:30"]];
 const el=document.getElementById("habits"); el.innerHTML="";
 let done=0;
 list.forEach(([id,name])=>{const ok=!!h[id]; if(ok)done++; const div=document.createElement("div");div.className="habit"+(ok?" done":"");div.innerHTML=`<div class="check"></div><span class="habit-name">${name}</span>`;div.onclick=()=>{h[id]=!h[id];saveData(d);renderHome()};el.appendChild(div)});
 const pct=Math.round(done/list.length*100);document.getElementById("habitCount").textContent=`${done}/${list.length}`;document.getElementById("progressText").textContent=`${pct}%`;document.getElementById("progressBar").style.width=pct+"%";
}
function resetToday(){const d=getData();d.water=0;d.sleep=null;Object.keys(d.habits).forEach(k=>d.habits[k]=false);saveData(d);if(location.pathname.endsWith("index.html")||location.pathname.endsWith("/"))renderHome();else location.reload()}
if(document.getElementById("habits"))renderHome();