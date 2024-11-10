var modal = document.getElementById("modal");

function searchModal() {
    div_modal.style.display = "flex";
    modal.showModal();

    modal.innerHTML = `
    <div class="conteudo-modal">
        <div class="superior-modal">
            <span class="titulo-modal">Pesquisa</span>
            <button onclick="fecharModal()" class="fecharModal"></button>
        </div>
        <div class="inferior-modal"
            <select class="input-modal" placeholder="Digite o bairro aqui"></select>
            <button onclick="pesquisaGeral()">Pesquisar</button>
        </div>
            `;
}

function bairroModal() {
    var modal = document.getElementById("modal");
    div_modal.style.display = "flex";
    modal.showModal();

    modal.innerHTML = `Teste 2<button onclick="fecharModal()" class="fecharModal"></button>`;
}

function ruaModal() {
    var modal = document.getElementById("modal");
    div_modal.style.display = "flex";
    modal.showModal();

    modal.innerHTML = `Teste 3<button onclick="fecharModal()" class="fecharModal"></button>`;
}

function infoModal() {
    var modal = document.getElementById("modal");
    div_modal.style.display = "flex";
    modal.showModal();

    modal.innerHTML = `Teste 4<button onclick="fecharModal()" class="fecharModal"></button>`;
}

function fecharModal() {
    div_modal.style.display = "none";
    modal.closeModal();
    search_geral.button.onclick = "searchModal()"
    search_bairro.button.onclick = "bairroModal()"
    search_rua.button.onclick = "ruaModal()"
} 