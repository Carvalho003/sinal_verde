const modalAdicionarPassageiro = modal_adicionar;

function abrirModal() {
    modalAdicionarPassageiro.showModal();
}

function closeModal(){
    modalAdicionarPassageiro.close();
}
function cancelar(){
    document.querySelector('.modal-content').reset()
    modalAdicionarPassageiro.close()
}
