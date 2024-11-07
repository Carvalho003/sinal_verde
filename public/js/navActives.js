//PEDINDO DE PARAMETRO O NUMERO DA SESSÃO QUE FOI OBSERVADA, 0,1,2 OU 3
const mudarActiveNavBar = section =>{
    //PEGANDO TODOS OS ITENS DA NAV BAR
    let itensDaNav = document.querySelector('.nav-list').querySelectorAll('.nav-item');
    //UM LOOP PARA PERCORRER TODOS OS ITENS DA NAV BAR
    for(var i = 0; i < itensDaNav.length; i++){
        // SE MINHA VOLTA NOS ITENS FOR IGUAL A SESSÃO OBSERVADA E PASSADA, POE A CLASSE DELE PARA 
        //ACTIVE
        if(i == section){
            itensDaNav[i].classList.add('active')
        //SE NÃO TIRA O ACTIVE DOS ITENS
        }else {
            itensDaNav[i].classList.remove('active')
        }
        
    }
}
//QUANDO MINHA TELA CARREGAR A FUNÇÃO SERÁ EXECUTADA
document.addEventListener('DOMContentLoaded', function() {


    //PEGANDO PELO NOME DO ID CADA SESSÃO QUE VOU PEDIR PARA OBSERVAR
let homeSection = document.getElementById('home');

let simuladorSection = document.getElementById('_simulador');

let equipeSection = document.getElementById('equipe');

let contatoSection = document.getElementById('_contato');







//PREPARANDO O OBJETO OBSERVADOR, PASSANDO QUE TERÁ ENTRADAS PARA ELE, E O PROPRIO OBJETO PARA ELE USAR
//COMO REFERENCIA
//DENTRO DELE TAMBÉM PRECISA DE UMA FUNÇÃO QUE SERÁ ATIVADA SEMPRE ENQUANTO ELE ESTIVER OBERVANDO
const trocarActive = new IntersectionObserver((entradas, trocarActive) => {
    entradas.forEach((entrada) =>{
        //MEU ALVO ESTA NA TELA?
        if(entrada.isIntersecting){
            //QUAL O ID DO MEU ALVO?
            if(entrada.target.id == 'home'){
                
                mudarActiveNavBar(0)
                //CHAMANDO FUNÇÃO PARA TROCAR O ITEM ATIVO NA NAV BAR
            }else if(entrada.target.id == '_simulador'){
                mudarActiveNavBar(1)
            }else if(entrada.target.id == 'equipe'){
                mudarActiveNavBar(2)
            }else if (entrada.target.id == '_contato'){
                mudarActiveNavBar(3)
            }
        }
    })
})

//MANDANDO MEU OBSERVADOR OBSERVAR TODAS AS SEÇÕES ABAIXO
trocarActive.observe(homeSection);
trocarActive.observe(simuladorSection);
trocarActive.observe(equipeSection);
trocarActive.observe(contatoSection);

});



