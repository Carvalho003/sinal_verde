let btns = document.querySelector('.page-diagrama');
btns = btns.querySelectorAll('span');

let slides = document.querySelectorAll('.slide-diagrama');


slides[1].style.backgroundColor = '#003519'
let identificador = slides[1].querySelector('span');
identificador.style.visibility = 'initial'
slides[0].style.backgroundColor = '#717774'
let identificadorAnterior = slides[0].querySelector('span');
identificadorAnterior.style.visibility = 'hidden'
slides[2].style.backgroundColor = '#717774'
let identificadorProximo = slides[2].querySelector('span');
identificadorProximo.style.visibility = 'hidden'

btns[0].addEventListener('click',()=>{

    slides[1].style.backgroundColor = '#003519'
    identificador = slides[1].querySelector('span');
    identificador.style.visibility = 'initial'
    slides[0].style.backgroundColor = '#717774'
    identificadorAnterior = slides[0].querySelector('span');
    identificadorAnterior.style.visibility = 'hidden'
    slides[2].style.backgroundColor = '#717774'
    identificadorProximo = slides[2].querySelector('span');
    identificadorProximo.style.visibility = 'hidden'
})
    btns[1].addEventListener('click',()=>{
    
        slides[2].style.backgroundColor = '#003519'
        identificador = slides[2].querySelector('span');
        identificador.style.visibility = 'initial'
        slides[1].style.backgroundColor = '#717774'
        identificadorAnterior = slides[1].querySelector('span');
        identificadorAnterior.style.visibility = 'hidden'
        slides[3].style.backgroundColor = '#717774'
        identificadorProximo = slides[3].querySelector('span');
        identificadorProximo.style.visibility = 'hidden'
})

btns[2].addEventListener('click',()=>{
    
    slides[3].style.backgroundColor = '#003519'
     identificador = slides[3].querySelector('span');
    identificador.style.visibility = 'initial'
    slides[2].style.backgroundColor = '#717774'
     identificadorAnterior = slides[2].querySelector('span');
    identificadorAnterior.style.visibility = 'hidden'
    slides[4].style.backgroundColor = '#717774'
      identificadorProximo = slides[4].querySelector('span');
    identificadorProximo.style.visibility = 'hidden'
})
btns[3].addEventListener('click',()=>{
    
    slides[4].style.backgroundColor = '#003519'
    identificador = slides[4].querySelector('span');
    identificador.style.visibility = 'initial'
    slides[3].style.backgroundColor = '#717774'
    identificadorAnterior = slides[3].querySelector('span');
    identificadorAnterior.style.visibility = 'hidden'
    slides[0].style.backgroundColor = '#717774'
    identificadorProximo = slides[0].querySelector('span');
    identificadorProximo.style.visibility = 'hidden'
})
btns[4].addEventListener('click',()=>{
    
    slides[0].style.backgroundColor = '#003519'
    identificador = slides[0].querySelector('span');
    identificador.style.visibility = 'initial'
    slides[4].style.backgroundColor = '#717774'
    identificadorAnterior = slides[4].querySelector('span');
    identificadorAnterior.style.visibility = 'hidden'
    slides[1].style.backgroundColor = '#717774'
    identificadorProximo = slides[1].querySelector('span');
    identificadorProximo.style.visibility = 'hidden'
})

function trocaSlide(numeroDoBotao){

    let destaque = numeroDoBotao +1;
    let anterior = destaque -1;
    let proximo = destaque +1;

    if (numeroDoBotao == 6){
        destaque = 1;
        proximo = 2;
        anterior = 0;
    }
    if(numeroDoBotao == 5){
        destaque = 1;
        proximo = 2;
        anterior = 0;
    }
    if(numeroDoBotao == 4){
        destaque = 0
        proximo = 1
        anterior = 4
    }
    if(numeroDoBotao == 3){
        proximo = 0
    }

    slides[destaque].style.backgroundColor = '#003519'

    identificador = slides[destaque].querySelector('span');
    identificador.style.visibility = 'initial'

    slides[anterior].style.backgroundColor = '#717774'

    identificadorAnterior = slides[anterior].querySelector('span');
    identificadorAnterior.style.visibility = 'hidden'

    slides[proximo].style.backgroundColor = '#717774'
    
    identificadorProximo = slides[proximo].querySelector('span');
    identificadorProximo.style.visibility = 'hidden'

}

function trocaSlideTras(numeroDoBotao){
    let destaque = numeroDoBotao +1;
    let anterior = destaque -1;
    let proximo = destaque +1;

    if(numeroDoBotao == 1){
        destaque = 0;
        anterior = 4;
        proximo = 1;
    }
    if(numeroDoBotao == 5){ 
        destaque = 4;
        proximo = 0;
        anterior = 3;
    }
    if(numeroDoBotao == 4){
        destaque = 3;
        proximo = 4;
        anterior = 2;
    }
    if(numeroDoBotao == 3){
        destaque = 2;
        proximo = 3;
        anterior = 1;
    }
    if(numeroDoBotao == 2){
        destaque = 1;
        proximo = 2;
        anterior = 0;
    }

    slides[destaque].style.backgroundColor = '#003519'
    identificador = slides[destaque].querySelector('span');
    identificador.style.visibility = 'initial'
    slides[proximo].style.backgroundColor = '#717774'
    identificadorProximo = slides[proximo].querySelector('span');
    identificadorProximo.style.visibility = 'hidden'
    slides[anterior].style.backgroundColor = '#717774'
    identificadorAnterior = slides[anterior].querySelector('span');
    identificadorAnterior.style.visibility = 'hidden'
}

function move(direcao){
    let numeroBotaoCerto = 0;

    for(var contador = 0; contador < btns.length; contador++){
        let listaDeClassesDoBotao = btns[contador].classList

        for(var contadorDasClasses =0; contadorDasClasses < listaDeClassesDoBotao.length; contadorDasClasses++){
            if(listaDeClassesDoBotao[contadorDasClasses] == "swiper-pagination-bullet-active"){
                numeroBotaoCerto = contador;
            }
        }
    }
    console.log(numeroBotaoCerto);
    if(direcao =='proximo'){
        trocaSlide(numeroBotaoCerto + 1);
    }else{
        trocaSlideTras(numeroBotaoCerto + 1);
    }
}
