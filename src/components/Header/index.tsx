import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'

import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
        <HeaderContainer>
            <img src={logo} alt="Logo ignite" />

            <nav>
                <NavLink to="/" end title="Cronômetro">
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="Histórico">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}
