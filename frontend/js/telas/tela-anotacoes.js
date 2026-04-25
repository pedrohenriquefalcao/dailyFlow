document.addEventListener("DOMContentLoaded", () => {
    
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
        
        seletorCategoria.value = 'anotacoes';
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
        document.getElementById('input-anotacao-cor').value = 'azul';
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

        if (categoria === 'anotacoes') {
            const titulo = document.getElementById('input-anotacao-titulo').value;
            const resumo = document.getElementById('input-anotacao-resumo').value;
            const cor = document.getElementById('input-anotacao-cor').value;
            
            if(!titulo || !resumo) return alert("Preencha o título e o resumo!");

            const diaAtual = new Date().getDate();

            dbAnotacoes.push({ id: diaAtual, titulo, resumo, cor });
            renderizarAnotacoes();
        } 
        
        fecharELimparModal();
    });

    function renderizarAnotacoes() {
        const container = document.getElementById('container-lista-anotacoes');
        container.innerHTML = ''; 

        if (dbAnotacoes.length === 0) {
            container.innerHTML = '<p style="color: #888; font-family: Alexandria, sans-serif; font-size: 14px;">Nenhuma anotação.</p>';
            return;
        }

        dbAnotacoes.forEach(nota => {
            let classeCor = 'fundo-azul';
            if(nota.cor === 'verde') classeCor = 'fundo-verde';
            if(nota.cor === 'vermelho') classeCor = 'fundo-vermelho';

            container.innerHTML += `
                <div class="cartao-anotacao">
                    <div class="circulo-data ${classeCor}">${nota.id}</div>
                    <div class="titulo-anotacao">${nota.titulo}</div>
                    <div class="resumo-anotacao">${nota.resumo}</div>
                </div>
            `;
        });
    }

    renderizarAnotacoes();

});