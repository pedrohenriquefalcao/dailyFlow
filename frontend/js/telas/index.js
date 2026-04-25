document.addEventListener("DOMContentLoaded", () => {
    
    const mockEventos = [
        { data: "Sáb., 21 de março", titulo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
        { data: "Seg., 30 de março", titulo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." }
    ];

    const mockTarefas = [
        { titulo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", prioridade: "alta" }, 
        { titulo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", prioridade: "media" }, 
        { titulo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", prioridade: "baixa" } 
    ];

    const mockAnotacoes = [
        { id: 17, titulo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
        { id: 21, titulo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." }
    ];

    function renderizarEventos(eventos) {
        const container = document.querySelector('.lista-eventos');
        container.innerHTML = ''; 

        if (eventos.length === 0) {
            container.innerHTML = '<p style="color: #888; font-family: Alexandria-Regular; font-size: 14px;">Sem eventos próximos no calendário.</p>';
            return;
        }

        eventos.forEach(evento => {
            const html = `
                <div class="entrada-evento">
                    <p class="data">${evento.data}</p>
                    <div class="cartao-evento">
                        <p>${evento.titulo}</p>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });
    }

    function renderizarTarefas(tarefas) {
        const container = document.querySelector('.lista-tarefas');
        container.innerHTML = ''; 

        if (tarefas.length === 0) {
            container.innerHTML = '<p style="color: #888; font-family: Alexandria-Regular; font-size: 14px;">Tudo feito por aqui! Nenhuma tarefa pendente.</p>';
            return;
        }

        tarefas.forEach(tarefa => {
            let classeBorda = 'borda-verde';
            if (tarefa.prioridade === 'alta') classeBorda = 'borda-vermelha';
            if (tarefa.prioridade === 'media') classeBorda = 'borda-amarela';

            const html = `
                <div class="tarefa">
                    <div class="texto-tarefa ${classeBorda}">
                        <p>${tarefa.titulo}</p>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });
    }

    function renderizarAnotacoes(anotacoes) {
        const container = document.querySelector('.lista-anotacoes');
        container.innerHTML = '';

        if (anotacoes.length === 0) {
            container.innerHTML = '<p style="color: #888; font-family: Alexandria-Regular; font-size: 14px;">Nenhuma anotação criada.</p>';
            return;
        }

        anotacoes.forEach(nota => {
            const html = `
                <div class="anotacao-item">
                    <div class="anotacao-numero">${nota.id}</div>
                    <div class="anotacao-conteudo">
                        <div class="anotacao-titulo">${nota.titulo}</div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });
    }

    renderizarEventos(mockEventos);
    renderizarTarefas(mockTarefas);
    renderizarAnotacoes(mockAnotacoes);

});