import { HandPalm, Play } from 'phosphor-react'
import { useContext, useState } from 'react'
import { CyclesContext } from '../../contexts/CycleContextProvider'
import { CountDown } from './Countdown'
import { NewFormCycle } from './NewFormCycle'
import {
    HomeContainer,
    StartCountdownButton,
    // eslint-disable-next-line prettier/prettier
    StopCountdownButton
} from './styles'

export function Home() {
    const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true)

    const { activeCycle, handleInterruptActiveCycle } =
        useContext(CyclesContext)

    function handleSetIsInputEmpty(isFormEmpty: boolean) {
        setIsInputEmpty(isFormEmpty)
    }

    return (
        <HomeContainer>
            <NewFormCycle handleSetIsInputEmpty={handleSetIsInputEmpty} />
            <CountDown />

            {activeCycle ? (
                <StopCountdownButton
                    type="button"
                    onClick={handleInterruptActiveCycle}
                >
                    <HandPalm size={24} />
                    Interromper
                </StopCountdownButton>
            ) : (
                <StartCountdownButton
                    type="submit"
                    form="timerForm"
                    disabled={isInputEmpty}
                >
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            )}
        </HomeContainer>
    )
}
