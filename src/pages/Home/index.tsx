import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { CountDown } from './Countdown'
import { NewFormCycle } from './NewFormCycle'
import {
    HomeContainer,
    StartCountdownButton,
    // eslint-disable-next-line prettier/prettier
    StopCountdownButton
} from './styles'

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface IContextCycle {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    isInputEmpty: boolean
    handleSetCycles: (newCycle: Cycle) => void
    handleSetAmountSecondsPassed: (amountSecondsPassed: number) => void
    handleStartNewCycle: (newCycle: Cycle) => void
    handleStopActiveCycle: () => void
    handleSetIsInputEmpty: (isFormEmpty: boolean) => void
}

export const CyclesContext = createContext({} as IContextCycle)

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true)

    function handleSetCycles(newCycle: Cycle) {
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
    }

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function handleSetAmountSecondsPassed(newAmountSecondsPassed: number) {
        setAmountSecondsPassed(newAmountSecondsPassed)
    }

    function handleStartNewCycle(newCycle: Cycle) {
        setCycles((state) => {
            return [...state, newCycle]
        })
        setActiveCycleId(newCycle.id)
        console.log(newCycle)
    }

    function handleStopActiveCycle() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle
                }
            }),
        )
        setActiveCycleId(null)
    }

    function handleSetIsInputEmpty(isFormEmpty: boolean) {
        setIsInputEmpty(isFormEmpty)
    }

    return (
        <HomeContainer>
            <CyclesContext.Provider
                value={{
                    activeCycle,
                    handleSetCycles,
                    activeCycleId,
                    handleSetAmountSecondsPassed,
                    isInputEmpty,
                    amountSecondsPassed,
                    handleStartNewCycle,
                    handleStopActiveCycle,
                    handleSetIsInputEmpty,
                }}
            >
                <NewFormCycle />
                <CountDown />
            </CyclesContext.Provider>

            {activeCycle ? (
                <StopCountdownButton
                    type="button"
                    onClick={handleStopActiveCycle}
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
