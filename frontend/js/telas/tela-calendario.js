document.addEventListener("DOMContentLoaded", () => {
    
    let dbEventos = [];

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
        
        seletorCategoria.value = 'calendario';
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

        if (categoria === 'calendario') {
            const titulo = document.getElementById('input-calendario-titulo').value;
            const dataCrua = document.getElementById('input-calendario-data').value;
            
            if(!titulo || !dataCrua) return alert("Preencha o título e a data!");

            const partesData = dataCrua.split('-');
            const diaEscolhido = parseInt(partesData[2], 10); 

            dbEventos.push({ 
                dia: diaEscolhido, 
                titulo: titulo 
            });

            renderizarCalendario();
        } 
        
        fecharELimparModal();
    });

    function renderizarCalendario() {
        const grid = document.getElementById('grid-calendario');
        grid.innerHTML = ''; 

        for (let i = 1; i <= 35; i++) {
            
            if (i <= 31) {
                const eventosDesteDia = dbEventos.filter(evento => evento.dia === i);
                
                let htmlEventos = '';
                eventosDesteDia.forEach(evento => {
                    htmlEventos += `<div class="evento-etiqueta">${evento.titulo}</div>`;
                });

                grid.innerHTML += `
                    <div class="celula-dia">
                        <span class="numero-dia">${i}</span>
                        ${htmlEventos}
                    </div>
                `;
            } else {
                grid.innerHTML += `
                    <div class="celula-dia">
                        <span class="numero-dia inativo">${i - 31}</span>
                    </div>
                `;
            }
        }
    }

    renderizarCalendario();

});