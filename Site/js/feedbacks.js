document.addEventListener('DOMContentLoaded', function () {


    let divPaginacao = document.querySelector('.paginacao_feed');
    let btns_page = divPaginacao.querySelectorAll('span');
     // Isso deve funcionar corretamente após o DOM carregar.

    let slides = document.querySelectorAll('.box-feed');
    let opacidadeBaixa = '0.2'
    let opacidadeNormal = '1'

    slides[0].style.opacity= opacidadeBaixa;
    slides[2].style.opacity = opacidadeBaixa
    console.log(slides)

        btns_page[0].addEventListener('click', () =>{
            slides[0].style.opacity= opacidadeBaixa;
            slides[2].style.opacity = opacidadeBaixa
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