const flavors=[
 {name:"Madagascar Vanilla",short:"Vanilla",note:"Vanilla bean · sweet cream",price:"$12.00",bg:"#2e8aae",image:"assets/vanilla.png"},
 {name:"Strawberry Fields",short:"Strawberry",note:"Ripe strawberry · cream",price:"$12.00",bg:"#ed4f91",image:"assets/strawberry.png"},
 {name:"Brownie Fudge",short:"Chocolate",note:"Cocoa · brownie · fudge",price:"$14.00",bg:"#765042",image:"assets/chocolate.png"},
 {name:"Mint Chip",short:"Mint",note:"Cool mint · dark chocolate",price:"$13.00",bg:"#55a779",image:"assets/mint.png"},
 {name:"Cookie Dough",short:"Cookie Dough",note:"Brown sugar · dough bites · chips",price:"$14.00",bg:"#b9803e",image:"assets/cookie-dough.png"},
 {name:"Blue Raspberry Rush",short:"Blue Raspberry",note:"Blue raspberry · candy crunch",price:"$13.00",bg:"#1669df",image:"assets/blue-raspberry.png"}];
let active=0,bag=0;
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const site=$(".website"),main=$("#main-pint"),name=$("#flavor-name"),note=$("#flavor-note"),one=$("#side-one"),two=$("#side-two");
function show(index){
 active=(index+flavors.length)%flavors.length;const f=flavors[active],n1=flavors[(active+1)%flavors.length],n2=flavors[(active+2)%flavors.length];
 site.style.setProperty("--hero",f.bg);main.src=f.image;main.alt=f.name+" ice cream pint";name.textContent=f.name;note.textContent=f.note;
 one.src=n1.image;one.alt=n1.name;two.src=n2.image;two.alt=n2.name;
 $$(".mini-flavor")[0].dataset.index=(active+1)%flavors.length;$$(".mini-flavor")[1].dataset.index=(active+2)%flavors.length;
 $$(".mini-flavor span")[0].textContent=n1.short;$$(".mini-flavor span")[1].textContent=n2.short;
 $("#slide-number").textContent=String(active+1).padStart(2,"0");
 $$(".dots button").forEach((d,i)=>d.classList.toggle("active",i===active));
 main.animate([{opacity:0,transform:"translateY(24px) scale(.9)"},{opacity:1,transform:"none"}],{duration:520,easing:"cubic-bezier(.2,.8,.2,1)"});
}
function add(){bag++;$("#bag-count").textContent=bag}
$(".previous").onclick=()=>show(active-1);$(".next").onclick=()=>show(active+1);$(".add").onclick=add;$(".bag").onclick=()=>{bag=0;$("#bag-count").textContent=0};
$$(".dots button").forEach(d=>d.onclick=()=>show(+d.dataset.index));$$(".mini-flavor").forEach(d=>d.onclick=()=>show(+d.dataset.index));
$("#cards").innerHTML=flavors.map((f,i)=>`<article data-index="${i}"><div class="card-pic" style="background:${f.bg}"><img src="${f.image}" alt="${f.name}"></div><div class="card-info"><h3>${f.short}</h3><p>${f.note}</p><strong>${f.price}</strong><button aria-label="Add ${f.name}">+</button></div></article>`).join("");
$$(".product-cards article").forEach(card=>{card.onclick=()=>show(+card.dataset.index);card.querySelector("button").onclick=e=>{e.stopPropagation();add()}});
$$("details").forEach(d=>d.addEventListener("toggle",()=>{d.querySelector("b").textContent=d.open?"−":"+"}));
show(0);
