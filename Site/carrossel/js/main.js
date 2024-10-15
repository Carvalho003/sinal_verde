let btns = document.querySelector('.page-especifico');
btns = btns.querySelectorAll('span');

let slides = document.querySelectorAll('.slide-meu');


slides[1].style.backgroundColor = 'green'
slides[0].style.backgroundColor = 'gray'
slides[2].style.backgroundColor = 'gray'
    
btns[0].addEventListener('click',() =>{
        //destaque
        slides[1].style.backgroundColor = 'green'

        //desfocados, sempre o mesmo numero do botao
        slides[0].style.backgroundColor = 'gray'
        // e tambem desfocado, 1 superior ao que esta em destaque

        slides[2].style.backgroundColor = 'gray'
})

    
btns[1].addEventListener('click',() =>{
    //destaque
    slides[2].style.backgroundColor = 'green'

    //desfocados, sempre o mesmo numero do botao
    slides[1].style.backgroundColor = 'gray'
    // e tambem desfocado, 1 superior ao que esta em destaque

    slides[3].style.backgroundColor = 'gray'
})

btns[2].addEventListener('click',() =>{
    //destaque
    slides[3].style.backgroundColor = 'green'

    //desfocados, sempre o mesmo numero do botao
    slides[2].style.backgroundColor = 'gray'
    // e tambem desfocado, 1 superior ao que esta em destaque

    slides[4].style.backgroundColor = 'gray'
})



btns[3].addEventListener('click',() =>{
    //destaque
    slides[4].style.backgroundColor = 'green'

    //desfocados, sempre o mesmo numero do botao
    slides[3].style.backgroundColor = 'gray'
    // e tambem desfocado, 1 superior ao que esta em destaque

    slides[5].style.backgroundColor = 'gray'
})

btns[4].addEventListener('click',() =>{
    //destaque
    slides[5].style.backgroundColor = 'green'

    //desfocados, sempre o mesmo numero do botao
    slides[4].style.backgroundColor = 'gray'
    // e tambem desfocado, 1 superior ao que esta em destaque

    slides[0].style.backgroundColor = 'gray'
})



btns[5].addEventListener('click',() =>{
    //destaque
    slides[0].style.backgroundColor = 'green'

    //desfocados, sempre o mesmo numero do botao
    slides[5].style.backgroundColor = 'gray'
    // e tambem desfocado, 1 superior ao que esta em destaque

    slides[1].style.backgroundColor = 'gray'
})

function trocaSlide(numeroDoBotao){
    //destaque sempre o proximo
    console.log(numeroDoBotao)
    let destaque = numeroDoBotao + 1;
    let anterior = destaque -1;
    let proximo = destaque + 1;
    if(numeroDoBotao == 6 ){
        destaque = 1;
        anterior = 0;
        proximo =2;
    }
    if(numeroDoBotao == 5){
        destaque = 0;
        proximo = 1;
    }
    if(numeroDoBotao == 4){
        proximo = 0;

    }
    slides[destaque].style.backgroundColor = 'green'

    //desfocados, sempre o mesmo numero do botao
    slides[anterior].style.backgroundColor = 'gray'
    // e tambem desfocado, 1 superior ao que esta em destaque

    slides[proximo].style.backgroundColor = 'gray'

    
}


function trocaSlideTras(numeroDoBotao){
    //destaque sempre o proximo
    console.log(numeroDoBotao)
    let destaque = numeroDoBotao + 1;
    let anterior = destaque -1;
    let proximo = destaque + 1;
    if(numeroDoBotao == 1 ){
        destaque = 0;
        anterior = 5;
        proximo =1;
    }
    if(numeroDoBotao == 6){
        destaque = 5;
        proximo = 0;
        anterior =4;
    }
    if(numeroDoBotao == 5){
        proximo = 5;
        anterior = 3;
        destaque = 4;

    }
    if(numeroDoBotao == 4){
        proximo = 4;
        anterior = 2;
        destaque = 3;
    }
    if(numeroDoBotao == 3){
        proximo = 3;
        anterior = 1;
        destaque = 2;
    }
    if(numeroDoBotao == 2){
        proximo = 2;
        anterior = 0;
        destaque =1;
    }
    slides[destaque].style.backgroundColor = 'green'

    //desfocados, sempre o mesmo numero do botao
    slides[anterior].style.backgroundColor = 'gray'
    // e tambem desfocado, 1 superior ao que esta em destaque

    slides[proximo].style.backgroundColor = 'gray'

    
}

function move(direcao){
    
        //o numero do botao de paginacao  certo, 
        let numeroBotaoCerto = 0;
        //ele vai percorrer cada bolinha de paginacao, ou seja os botoes
        for(var contador = 0; contador < btns.length;contador++){
            let listaDeClassesDoBotao = btns[contador].classList
            
            
            for(var contadorDasClasses =0;contadorDasClasses <listaDeClassesDoBotao.length; contadorDasClasses++){
                if(listaDeClassesDoBotao[contadorDasClasses] == "swiper-pagination-bullet-active"){
                    numeroBotaoCerto = contador;
                }
            }
        }
        console.log(numeroBotaoCerto);
        if(direcao == 'proximo'){
            trocaSlide(numeroBotaoCerto + 1);

        }else{
            trocaSlideTras(numeroBotaoCerto +1)
    }
}