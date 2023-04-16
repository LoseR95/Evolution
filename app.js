//                                                          Ares de estructuras de datos que no son para el DOM
let frasesMotivacion=[
    "No hay nada noble en ser superior a los otros Hombres, la <span>NOBLEZA</span>, es ser <span>SUPERIOR</span> a tu PREVIO <span>YO</span>.",
    "No naci como un <span>DIOS</span>, Me lo <span>GANE</span>.",
    "No ser <span>PERFECTO</span> significa, Muerte.",
    "Es estupido <span>PEDIRLE</span> a los dioses lo que cada <span>UNO</span> puede conseguir por si <span>MISMO</span>.",
    "El <span>TIEMPO</span> es la unica moneda en la <span>VIDA</span>, usalo sabiamente, se acaba demaciado <span>RAPIDO</span>.",
    "Entrena <span>MENTE</span> y cuerpo, consige <span>PODER</span> y conviertete en alquien peligroso, si no eres capas de ejercer gran violencia, no eres <span>PACIFICO</span>, eres inofencivo.",
    "No destruyes un lugar hasta que <span>TIENES</span> a <span>ALGUIEN</span> para reconstruirlo, todos somos iguales cuando estamos muertos.",
    "La diferncia entre los animales y los <span>HUMANOS</span> es que los animales nunca permitiran que el mas <span>TONTO</span> e incapaz de la <span>MANADA</span> los guie.",
    "El <span>HOMBRE</span> no puede rehacerse a si mismo sin <span>SUFRIR</span> porque es a la vez el marmol y el escultor."
]
let aumento=0;
let rachaAcumulada=0;
let cadena=[];

let hoy=moment();
console.log(hoy._d);


//                                                        Area de Funciones
function canviarFrase(){

    if(aumento<frasesMotivacion.length)
        frase.innerHTML=frasesMotivacion[aumento];
    else{
        aumento=0;
        frase.innerHTML=frasesMotivacion[aumento];
    }

    let hijos=frase.children;
    for(i of hijos){
        i.classList.add("color");
    }
    aumento++;
}


//                                                          Ares de variables para el DOM
let capa=document.querySelector(".cajaPrincipal");
let activador=document.querySelector('#activador')
let activadorEditar=document.querySelector('.barraBotones_lista li:nth-child(4)');

let boton=document.querySelector('.barraBotones');
let barra=document.querySelector('.barraNavegacion');
let lista=document.querySelector('.barraNavegacion_lista');

let lema=document.querySelector('.lema');
let fuegoDias=document.querySelector('.fuego')
let contadorDias=document.querySelector('.contadorDias')
let totalRetos=document.querySelector('.total')
let retosCumplidos=document.querySelector('.cumplidos')

let formulario=document.querySelector('.cajaObjetivo_formulario');
let numeroDeRetos=formulario.childElementCount;

let editar=formulario.nextElementSibling;
console.dir(activadorEditar);

let frase=document.querySelector('.frase');


//                                                                area de operaciones
for(let i=0; i<numeroDeRetos; i++){
    cadena.push(formulario.children[i].children[0]);    
}


if(localStorage.getItem("contadorDias")){
    
    rachaAcumulada=localStorage.getItem("contadorDias");
    contadorDias.innerText=rachaAcumulada;
    console.log(" SIRVE");
    
    if(rachaAcumulada>0){
        fuegoDias.classList.add('rachaActiva');
        contadorDias.classList.add('rachaActiva');
    }
   
}

totalRetos.innerHTML=numeroDeRetos;


//                                                         Area de eventos
// activador de la barra 
activador.addEventListener('click',()=>{
    barra.classList.toggle('aumenta');
    capa.classList.toggle('oscuro');
});

// activador editar
activadorEditar.addEventListener('click',(e)=>{
    editar.classList.toggle("editar");
    activadorEditar.classList.toggle('resaltado');
})


formulario.addEventListener('click',(e)=>{

    canviarFrase();
    
    let cadenaReto=cadena.map((i)=>{
        return i.checked;
    });

    let filtro=cadenaReto.filter((e)=>{
        return e===true;
    })
    
    retosCumplidos.innerHTML=filtro.length;
    
    if(filtro.length>0){
        retosCumplidos.classList.add("color");
    }
    else{
        retosCumplidos.classList.remove('color');
    }

    // Aqui tienees que corregir el cuando selecciono el texto se activan 2 eventos y si solo activo la caja todo bien
    // tambien por lo mismo cuanto estan desablilitados las cajas todo bien pero cuando seleccionas la tetras sige aumentando el contador
    
    

    if(cadenaReto.every(e=> e===true)){    
        lema.classList.add("animacion");
        if(rachaAcumulada===0){
            fuegoDias.classList.add('rachaActiva');
            contadorDias.classList.add('rachaActiva');
        }

        rachaAcumulada ++;
        localStorage.setItem("contadorDias",rachaAcumulada);
        contadorDias.innerText=localStorage.getItem("contadorDias");
       
        for(let i of cadena){
            i.checked=false;
            retosCumplidos.innerHTML=0;
            i.disabled=false;
            retosCumplidos.classList.remove('color');
        }    
    }
});





