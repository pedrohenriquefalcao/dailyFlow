document.addEventListener("DOMContentLoaded", () => {
    
    let dbTarefas = [];

    const modal = document.getElementById('fundo-modal');
    const btnAbrirModal = document.getElementById('botao-abrir-modal');
    const btnFecharModal = document.getElementById('fechar-modal');
    const seletorCategoria = document.getElementById('seletor-categoria');
    const btnCriar = document.getElementById('botao-criar-tarefa');

    const camposTodo = document.getElementById('campos-todo');
    const camposCalendario = document.getElementById('campos-calendario');
    const camposAnotacoes = document.getElementById('campos-anotacoes');

    btnAbrirModal.addEventListener('click', () => {
        modal.classList.remove('esconder-elemento');
        modal.classList.add('mostrar-elemento-flex');
        
        seletorCategoria.value = 'todo';
        seletorCategoria.dispatchEvent(new Event('change'));
    });

    function fecharELimparModal() {
        modal.classList.add('esconder-elemento');
        modal.classList.remove('mostrar-elemento-flex');
        
        seletorCategoria.value = 'inicial';
        camposTodo.classList.add('esconder-elemento');
        camposCalendario.classList.add('esconder-elemento');
        camposAnotacoes.classList.add('esconder-elemento');
        btnCriar.classList.add('esconder-elemento');
        
        document.querySelectorAll('.input-modal').forEach(input => {
            if(input.tagName === 'INPUT') input.value = '';
        });
    }

    btnFecharModal.addEventListener('click', fecharELimparModal);
    
    seletorCategoria.addEventListener('change', (evento) => {
        const categoria = evento.target.value;
        
        camposTodo.classList.add('esconder-elemento');
        camposCalendario.classList.add('esconder-elemento');
        camposAnotacoes.classList.add('esconder-elemento');
        
        btnCriar.classList.remove('esconder-elemento');
        btnCriar.classList.add('mostrar-elemento-block');

        if (categoria === 'todo') camposTodo.classList.remove('esconder-elemento');
        if (categoria === 'calendario') camposCalendario.classList.remove('esconder-elemento');
        if (categoria === 'anotacoes') camposAnotacoes.classList.remove('esconder-elemento');
    });
    
    btnCriar.addEventListener('click', () => {
        const categoria = seletorCategoria.value;

        if (categoria === 'todo') {
            const titulo = document.getElementById('input-todo-titulo').value;
            const prioridade = document.getElementById('input-todo-prioridade').value;
            if(!titulo || !prioridade) return alert("Preencha o título e prioridade!");

            dbTarefas.push({ titulo, prioridade });
            renderizarTarefas();
        } 
        
        fecharELimparModal();
    });

    function renderizarTarefas() {
        const container = document.getElementById('container-lista-todo');
        container.innerHTML = ''; 

        if (dbTarefas.length === 0) {
            container.innerHTML = '<p style="color: #888; font-family: Alexandria, sans-serif; font-size: 14px;">Lista de To-Do vazia.</p>';
            return;
        }

        dbTarefas.forEach(tarefa => {
            let classeCaixa = 'caixa-prioridade-baixa';
            let classeBolinha = 'bolinha-prioridade-baixa';

            if (tarefa.prioridade === 'alta') {
                classeCaixa = 'caixa-prioridade-alta';
                classeBolinha = 'bolinha-prioridade-alta';
            } else if (tarefa.prioridade === 'media') {
                classeCaixa = 'caixa-prioridade-media';
                classeBolinha = 'bolinha-prioridade-media';
            }

            container.innerHTML += `
                <div class="item-todo">
                    <div class="circulo-check"></div>
                    <div class="caixa-texto-todo ${classeCaixa}">${tarefa.titulo}</div>
                    <div class="bolinha-status ${classeBolinha}"></div>
                </div>
            `;
        });
    }

    renderizarTarefas();

});