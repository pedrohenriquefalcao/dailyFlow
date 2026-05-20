import React from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';

export default function Cadastro() {
    return (
        <div className="container-tela-cadastro">
            <div className="caixa-cadastro">

                <div className="cadastro-painel-azul">
                    <div className="conteudo-informativo">
                        <h2>Já tenho uma conta</h2>
                        <p>Entre com seu Email e Senha</p>
                        <Link to="/">
                            <button className="btn-entrar-outline">ENTRAR</button>
                        </Link>
                    </div>
                </div>

                <div className="cadastro-painel-branco">
                    <div className="formulario-cadastro">
                        <h1>Crie uma conta</h1>
                        <p className="subtitulo-cadastro">Registre com Email</p>

                        <div className="campo-input">
                            <input type="text" placeholder="Digite seu nome completo" />
                        </div>

                        <div className="campo-input">
                            <input type="email" placeholder="Seu melhor Email" />
                        </div>

                        <div className="campo-input">
                            <input type="tel" placeholder="Seu número de telefone" />
                        </div>

                        <div className="campo-input">
                            <input type="password" placeholder="Digite a sua senha" />
                        </div>

                        <div className="campo-input">
                            <input type="password" placeholder="Confirme a senha" />
                        </div>

                        <Link to="/cadastro-sucesso">
                            <button className="btn-criar-conta">CRIAR CONTA</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}