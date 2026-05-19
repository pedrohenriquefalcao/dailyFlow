import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
    return (
        <div className="login-page-wrapper">
            <div className="caixa-login">
                <div className="painel-esquerdo">
                    <div className="formulario-conteudo">
                        <h1>Entre agora</h1>
                        <p className="texto-boas-vindas">Entre com Email & Senha</p>

                        <div className="grupo-campo">
                            <label>E-mail</label>
                            <input type="email" placeholder="digite o seu e-mail" />
                        </div>

                        <div className="grupo-campo">
                            <label>Senha</label>
                            <input type="password" placeholder="digite a sua senha" />
                        </div>

                        <div className="opcoes-acesso">
                            {/* <label className="opcao-lembrar">
                                <input type="checkbox" /> Lembrar senha
                            </label> */}
                            <Link to="#" className="link-esqueci-senha">Esqueci minha senha</Link>
                        </div>

                        <Link to="/home">
                            <button className="botao-entrar">ENTRAR</button>
                        </Link>

                        {/* <button className="botao-google">
                            <img src="./assets/icones/google.png" alt="G" />
                            Ou fazer login com o Google
                        </button> */}
                    </div>
                </div>

                <div className="painel-direito">
                    <div className="conteudo-azul">
                        <h2>Começar planejamento</h2>
                        <p>Crie uma conta e comece a se organizar agora!</p>
                        <Link to="/cadastro">
                            <button className="botao-comecar">COMEÇAR</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}