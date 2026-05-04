document.addEventListener("DOMContentLoaded", () => {
    
    let dbEventos = [];
    let dbTarefas = [];
    let dbAnotacoes = [];

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
            if(!titulo) return alert("Preencha o título!");

            dbTarefas.push({ titulo, prioridade });
            renderizarTarefas();
        } 
        else if (categoria === 'calendario') {
            const titulo = document.getElementById('input-calendario-titulo').value;
            const dataCrua = document.getElementById('input-calendario-data').value;
            if(!titulo || !dataCrua) return alert("Preencha o título e a data!");

            const dataFormatada = new Date(dataCrua).toLocaleDateString('pt-BR', { 
                weekday: 'short', day: '2-digit', month: 'long' 
            }).replace('.', '.,');

            dbEventos.push({ titulo: titulo, data: dataFormatada });
            renderizarEventos();
        } 
        else if (categoria === 'anotacoes') {
            const titulo = document.getElementById('input-anotacao-titulo').value;
            if(!titulo) return alert("Preencha o título!");

            const diaAtual = new Date().getDate();

            dbAnotacoes.push({ id: diaAtual, titulo: titulo });
            renderizarAnotacoes();
        }

        fecharELimparModal();
    });

    function renderizarEventos() {
        const container = document.querySelector('.lista-eventos');
        container.innerHTML = ''; 

        if (dbEventos.length === 0) {
            container.innerHTML = '<p style="color: #888; font-family: Alexandria, sans-serif; font-size: 14px;">Sem eventos agendados.</p>';
            return;
        }

        dbEventos.forEach(evento => {
            container.innerHTML += `
                <div class="entrada-evento">
                    <p class="data">${evento.data}</p>
                    <div class="cartao-evento">
                        <p>${evento.titulo}</p>
                    </div>
                </div>
            `;
        });
    }

    function renderizarTarefas() {
        const container = document.querySelector('.lista-tarefas');
        container.innerHTML = ''; 

        if (dbTarefas.length === 0) {
            container.innerHTML = '<p style="color: #888; font-family: Alexandria, sans-serif; font-size: 14px;">Lista vazia.</p>';
            return;
        }

        dbTarefas.forEach(tarefa => {
            let classeBorda = 'borda-verde'; 
            if (tarefa.prioridade === 'alta') classeBorda = 'borda-vermelha';
            if (tarefa.prioridade === 'media') classeBorda = 'borda-amarela';

            container.innerHTML += `
                <div class="tarefa">
                    <div class="texto-tarefa ${classeBorda}">
                        <p>${tarefa.titulo}</p>
                    </div>
                </div>
            `;
        });
    }

    function renderizarAnotacoes() {
        const container = document.querySelector('.lista-anotacoes');
        container.innerHTML = '';

        if (dbAnotacoes.length === 0) {
            container.innerHTML = '<p style="color: #888; font-family: Alexandria, sans-serif; font-size: 14px;">Nenhuma anotação.</p>';
            return;
        }

        dbAnotacoes.forEach(nota => {
            container.innerHTML += `
                <div class="anotacao-item">
                    <div class="anotacao-numero">${nota.id}</div>
                    <div class="anotacao-conteudo">
                        <div class="anotacao-titulo">${nota.titulo}</div>
                    </div>
                </div>
            `;
        });
    }

    renderizarEventos();
    renderizarTarefas();
    renderizarAnotacoes();

});