document.addEventListener("DOMContentLoaded", () => {
    const fundoModal = document.getElementById("fundo-modal");
    const botaoFechar = document.getElementById("fechar-modal");
    const seletorCategoria = document.getElementById("seletor-categoria");
    const botaoCriar = document.getElementById("botao-criar-tarefa");
    const camposDinamicos = document.querySelectorAll(".campos-dinamicos");
    

    const botoesAdicionar = document.querySelectorAll(".botao-adicionar-pequeno, .botao-flutuante-adicionar");

    botoesAdicionar.forEach(botao => {
        botao.addEventListener("click", () => {
            fundoModal.style.display = "flex";
        });
    });

    botaoFechar.addEventListener("click", () => {
        fundoModal.style.display = "none";
        resetarModal();
    });

    fundoModal.addEventListener("click", (e) => {
        if (e.target === fundoModal) {
            fundoModal.style.display = "none";
            resetarModal();
        }
    });

    seletorCategoria.addEventListener("change", (e) => {
        const categoriaSelecionada = e.target.value;

        camposDinamicos.forEach(campo => {
            campo.style.display = "none";
        });

        if (categoriaSelecionada !== "inicial") {
            document.getElementById(`campos-${categoriaSelecionada}`).style.display = "flex";
            botaoCriar.style.display = "block";
        }
    });

    function resetarModal() {
        seletorCategoria.value = "inicial";
        camposDinamicos.forEach(campo => campo.style.display = "none");
        botaoCriar.style.display = "none";
        
        const inputs = fundoModal.querySelectorAll("input");
        inputs.forEach(input => input.value = "");
    }
});