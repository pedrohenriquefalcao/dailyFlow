// BARRA DE NAVEGAÇÃO: FALTA ADICIONAR INTERATIVIDADE (DROPDOWN PARA O LADO)


import React from 'react';
import { Link } from 'react-router-dom';
import './BarraLateral.css';

import menuBurger from '../../assets/icons/menu-burger.svg';
import homeIcon from '../../assets/icons/home.svg';
import usuarioIcon from '../../assets/icons/usuario.svg';
import luaIcon from '../../assets/icons/lua.svg';
import engrenagemIcon from '../../assets/icons/engrenagem.svg';

export default function BarraLateral() {
    return (
        <aside className="barra-lateral">
            <div className="menu-topo">
                <Link to="#">
                    <img src={menuBurger} alt="Menu" />
                </Link>
            </div>

            <div className="icones-centrais">
                <Link to="/home">
                    <img src={homeIcon} alt="Início" />
                </Link>
                <Link to="/perfil">
                    <img src={usuarioIcon} alt="Perfil" />
                </Link>
                <Link to="#">
                    <img src={luaIcon} alt="Alternar Tema" />
                </Link>
            </div>

            <div className="config-baixo">
                <Link to="#">
                    <img src={engrenagemIcon} alt="Configurações" />
                </Link>
            </div>
        </aside>
    );
}