var modal = document.getElementById("modal");

function searchModal() {
    modal.style.display = 'flex';
    modal.showModal();

    modal.innerHTML = `
    <div class="conteudo-modal">
        <div class="superior-modal">
            <span class="titulo-modal">Pesquisa</span>
            <button onclick="fecharModal()" class="fecharModal"></button>
        </div>
        <div class="inferior-modal"
            <select class="input-modal" placeholder="Digite o bairro aqui"></select>
            <button onclick="fecharModal()" style="border: 2px solid black">Pesquisar</button>
        </div>
            `;
}

function bairroModal() {
    modal.style.display = 'flex';
    modal.showModal();
    modal.innerHTML = `Teste 2<button onclick="fecharModal()" class="fecharModal"></button>`;
}

function ruaModal() {
    modal.style.display = 'flex';
    modal.showModal();
    modal.innerHTML = `Teste 3<button onclick="fecharModal()" class="fecharModal"></button>`;
}

function infoModal() {
    modal.style.display = 'flex';
    modal.showModal();
    modal.innerHTML = `Teste 4<button onclick="fecharModal()" class="fecharModal"></button>`;
}

function fecharModal() {
    modal.style.display = 'none'
    modal.close();
    search_geral.button.onclick = "searchModal()"
    search_bairro.button.onclick = "bairroModal()"
    search_rua.button.onclick = "ruaModal()"
} 