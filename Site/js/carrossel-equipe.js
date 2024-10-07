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
        foto: '14.png',
        nome: 'Felipe Smith',
        cargo:'Dev Front-End',
        mensagem: 'Muita midia trabalhar aqui, muito espaço para expressar minhas ideias'
    },
    2:{
        foto: '14.png',
        nome: 'Ranier Smith',
        cargo:'Dev Front-End',
        mensagem: 'Muita midia trabalhar aqui, muito espaço para expressar minhas ideias'
    },
    3:{
        foto: '14.png',
        nome: 'Caio Smith',
        cargo:'Dev Front-End',
        mensagem: 'Muita midia trabalhar aqui, muito espaço para expressar minhas ideias'
    },
    4:{
        foto: '14.png',
        nome: 'Matheus Smith',
        cargo:'Dev Front-End',
        mensagem: 'Muita midia trabalhar aqui, muito espaço para expressar minhas ideias'
    }
}

const renderizar = operacao =>{
    counterCarrossel = operacao == 1 && counterCarrossel < 4 ? counterCarrossel + 1 : counterCarrossel >=0 ? counterCarrossel -1 : counterCarrossel;
    
    console.log(counterCarrossel)

    let infosAtual = dadosColaboradores[counterCarrossel]
    
    boxComentario.classList.toggle('visible');
    setTimeout(() => {

        fotoColab.style.backgroundImage = `url('./img/equipe/${infosAtual.foto}')`;
        nomeColab.innerText = infosAtual.nome;
        cargoColab.innerText = infosAtual.cargo;
        mensagemColab.innerText = infosAtual.mensagem;
        boxComentario.classList.toggle('visible');
    },800)


}

