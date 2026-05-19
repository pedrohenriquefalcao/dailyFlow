document.addEventListener("DOMContentLoaded", () => {
    const dadosSalvos = localStorage.getItem('notaClicada');

    if (dadosSalvos) {
        const nota = JSON.parse(dadosSalvos);
        
        document.getElementById('titulo-expandido').innerText = nota.titulo;
    } else {
        document.getElementById('titulo-expandido').innerText = "Nota não encontrada";
    }
});