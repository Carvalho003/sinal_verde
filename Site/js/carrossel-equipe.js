let fotoColab = document.getElementById('foto-colab');
let nomeColab = document.getElementById('nome-colab');
let cargoColab = document.getElementById('cargo-colab');
let mensagemColab = document.getElementById('mensagem-colab');
let boxComentario = document.getElementById('box_comentario');

let counterCarrossel = 0;

let dadosColaboradores = {
    0:{
        foto: 'hugo.png',
        nome: 'Hugo Carvalho',
        cargo:'Dev Back-End',
        mensagem: 'Trabalhar nesse projeto para mim é muito especial, me sinto confortável e livre para compartilhar minhas ideias com os colaboradores.'
    },
    1:{
        foto: 'Caio.png',
        nome: 'Caio Visconti',
        cargo:'Dev Front-End',
        mensagem: 'Operar nesse projeto é algo muito significante para mim, trabalho bem feito e uma equipe muito prática e criativa. Um ótimo ambiente para produzir.'
    },
    2:{
        foto: 'raniero.png',
        nome: 'Ranier Dalton',
        cargo:'Equipe Desenvolvimento',
        mensagem: 'Participar desse projeto é muito gratificante, pois pude aprender tanto no aspecto técnico quanto no trabalho em grupo, aprimorando minhas habilidades e a colaboração.'
    },
    3:{
        foto: 'felipebranco.jpg',
        nome: 'Felipe Barbosa',
        cargo:'Dev Front-End',
        mensagem: 'Desenvolver com essa equipe fez com que eu evoluisse muito como front-end, time muito responsável e interativo, todos bem focados.'
    },
    4:{
        foto: 'matheus.png',
        nome: 'Matheus Marques',
        cargo:'Dev Front-End',
        mensagem: 'Participar deste projeto é muito especial para mim. Sinto-me à vontade e com liberdade para compartilhar minhas ideias com a equipe, o que torna a experiência ainda mais enriquecedora.'
    }
}

// SE A OPERAÇÃO FOR 1 É PARA PASSAR PRO PRÓXIMO, SE FOR 2 É PARA VOLTAR
const renderizar = operacao => {
    //ESTRUTURA DE IF TERNARIO
    counterCarrossel = operacao == 1 && counterCarrossel < 4 ? counterCarrossel + 1 : counterCarrossel >=0 ? counterCarrossel -1 : counterCarrossel;
    
    
    //BUSCANDO AS INFORMAÇÕES CORRESPONDENTES AO SLIDE QUE ESTÁ SENDO MOSTRADO
    let infosAtual = dadosColaboradores[counterCarrossel]
    //COLOCA O BOX COMO VISIVEL
    boxComentario.classList.toggle('visible');

    //TROCANDO AS INFORMAÇÕES DAS BOX
    setTimeout(() => {

        fotoColab.style.backgroundImage = `url('./img/equipe/${infosAtual.foto}')`;
        nomeColab.innerText = infosAtual.nome;
        cargoColab.innerText = infosAtual.cargo;
        mensagemColab.innerText = infosAtual.mensagem;
        boxComentario.classList.toggle('visible');
    },800)


}

