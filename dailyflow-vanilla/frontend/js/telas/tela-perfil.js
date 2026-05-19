document.addEventListener("DOMContentLoaded", () => {

    const dbUsuarioLogado = {
        usuario: "Zé",
        nome: "José Oliveira Gomes Dos Santos",
        email: "josezito03200sucesso@gmail.com",
        senha: "123sucessojoze222"
    };

    function carregarDadosPerfil() {
        document.getElementById('input-perfil-usuario').value = dbUsuarioLogado.usuario;
        document.getElementById('input-perfil-nome').value = dbUsuarioLogado.nome;
        document.getElementById('input-perfil-email').value = dbUsuarioLogado.email;
        document.getElementById('input-perfil-senha').value = dbUsuarioLogado.senha;
    }

    const btnToggleSenha = document.getElementById('botao-toggle-senha');
    const inputSenha = document.getElementById('input-perfil-senha');

    btnToggleSenha.addEventListener('click', () => {
        if (inputSenha.type === 'password') {
            inputSenha.type = 'text';
        } else {
            inputSenha.type = 'password';
        }
    });

    carregarDadosPerfil();

});