document.addEventListener('DOMContentLoaded', function () {

    //PEGANDO OS BOTOES DE PAGINAÇÃO
    let divPaginacao = document.querySelector('.paginacao_feed');
    let btns_page = divPaginacao.querySelectorAll('span');
     
    //PEGANDO OS SLIDES DO CARROSSEL
    let slides = document.querySelectorAll('.box-feed');
    let opacidadeBaixa = '0.2'
    let opacidadeNormal = '1'
    //DEFININDO OS VALORES DAS OPACIDADES

    //COMO ESSES SERÃO OS PRIMEIROS SLIDES A APARECER NA TELA JÁ DEFINIMOS SEM NENHUMA CONDIÇÃO
    slides[0].style.opacity= opacidadeBaixa;
    slides[2].style.opacity = opacidadeBaixa
    
        //EM CADA FUNÇÃO SERÁ TROCADO OS DOIS SLIDES DA PONTA E O DO MEIO
        btns_page[0].addEventListener('click', () =>{
            //PRIMEIRO OS DOIS SLIDES COM A BAIXA OPACIDADE
            slides[0].style.opacity= opacidadeBaixa;
            slides[2].style.opacity = opacidadeBaixa;

            //DEPOIS O SLIDE EM DESTAQUE
            slides[1].style.opacity = opacidadeNormal;
        })

        btns_page[1].addEventListener('click', () =>{
            slides[1].style.opacity= opacidadeBaixa;
            slides[3].style.opacity = opacidadeBaixa
            slides[2].style.opacity = opacidadeNormal;
        })
        btns_page[2].addEventListener('click', () =>{
            slides[2].style.opacity= opacidadeBaixa;
            slides[4].style.opacity = opacidadeBaixa
            slides[3].style.opacity = opacidadeNormal;
        })
        btns_page[3].addEventListener('click', () =>{
            slides[3].style.opacity= opacidadeBaixa;
            slides[5].style.opacity = opacidadeBaixa
            slides[4].style.opacity = opacidadeNormal;
        })
        btns_page[4].addEventListener('click', () =>{
            slides[4].style.opacity= opacidadeBaixa;
            slides[0].style.opacity = opacidadeBaixa
            slides[5].style.opacity = opacidadeNormal;
        })
        btns_page[5].addEventListener('click', () =>{
            slides[5].style.opacity= opacidadeBaixa;
            slides[1].style.opacity = opacidadeBaixa
            slides[0].style.opacity = opacidadeNormal;
        })
    

  });