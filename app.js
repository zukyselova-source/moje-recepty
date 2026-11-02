const DEFAULT=[
  ['🍳','Snídaně'],
  ['🥖','Pomazánky'],
  ['🍲','Polévky'],
  ['🍽️','Hlavní jídla'],
  ['🥗','Saláty'],
  ['🍝','Těstoviny'],
  ['🥔','Přílohy'],
  ['🍰','Moučníky a dezerty'],
  ['🥐','Pečení'],
  ['🫙','Omáčky, dipy a dresinky'],
  ['🥤','Nápoje'],
  ['📁','Ostatní']
];

let data =
  JSON.parse(localStorage.getItem('mojeRecepty') || 'null') ||
  {sections:DEFAULT,recipes:[]};

let current=null;
let filter=null;
let photoData='';

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

const save=()=>
  localStorage.setItem('mojeRecepty',JSON.stringify(data));


function show(id){
  $$('.view').forEach(v=>v.classList.remove('active'));
  $('#'+id).classList.add('active');
  scrollTo(0,0);
}


function toast(t){
  let x=$('#toast');
  x.textContent=t;
  x.classList.add('show');
  setTimeout(()=>x.classList.remove('show'),1600);
}


function plural(n){
  return n===1
    ? '1 recept'
    : n<5
      ? n+' recepty'
      : n+' receptů';
}


function placeholder(){
  return 'data:image/svg+xml,'+
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="350">
        <rect width="100%" height="100%" fill="#eee3d7"/>
        <text x="50%" y="54%" text-anchor="middle" font-size="80">🍴</text>
      </svg>`
    );
}


function renderHome(){

  let q=$('#search').value.toLowerCase().trim();

  let rec=data.recipes.filter(r=>
    !q ||
    [r.name,r.ingredients,r.steps,r.note]
      .join(' ')
      .toLowerCase()
