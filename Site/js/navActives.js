
const mudarActiveNavBar = section =>{
    
    let itensDaNav = document.querySelector('.nav-list').querySelectorAll('.nav-item');
    console.log(itensDaNav);
    for(var i = 0; i < itensDaNav.length; i++){
        
        if(i == section){
            itensDaNav[i].classList.add('active')
        }else {
            itensDaNav[i].classList.remove('active')
        }
        
    }
}
document.addEventListener('DOMContentLoaded', function() {

let homeSection = document.getElementById('home');

let simuladorSection = document.getElementById('_simulador');

let equipeSection = document.getElementById('equipe');

let contatoSection = document.getElementById('_contato');

const opcoesAparicao = {
    threshold: 0.1, // O quanto do elemento deve estar visível antes de ativar
    rootMargin: "0px 0px -50px 0px" // Margem para ativar a animação um pouco antes
}




const trocarActive = new IntersectionObserver((entradas, trocarActive) => {
    entradas.forEach((entrada) =>{
        if(entrada.isIntersecting){
            console.log(entrada.target.id);
            if(entrada.target.id == 'home'){
                console.log(1212312)
                mudarActiveNavBar(0)
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

trocarActive.observe(homeSection);
trocarActive.observe(simuladorSection);
trocarActive.observe(equipeSection);
trocarActive.observe(contatoSection);

});



mudarActiveNavBar()