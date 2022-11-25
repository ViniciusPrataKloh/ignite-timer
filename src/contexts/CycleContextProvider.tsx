import { createContext, ReactNode, useState } from 'react'

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CycleContextProviderProps {
    children: ReactNode
}

interface IContextCycle {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    handleSetCycles: (newCycle: Cycle) => void
    handleSetAmountSecondsPassed: (amountSecondsPassed: number) => void
    handleStartNewCycle: (newCycle: Cycle) => void
    handleStopActiveCycle: () => void
}

export const CyclesContext = createContext({} as IContextCycle)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function handleSetCycles(newCycle: Cycle) {
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
    }

    function handleSetAmountSecondsPassed(newAmountSecondsPassed: number) {
        setAmountSecondsPassed(newAmountSecondsPassed)
    }

    function handleStartNewCycle(newCycle: Cycle) {
        setCycles((state) => {
            return [...state, newCycle]
        })
        setActiveCycleId(newCycle.id)
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

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                handleSetCycles,
                activeCycleId,
                handleSetAmountSecondsPassed,
                amountSecondsPassed,
                handleStartNewCycle,
                handleStopActiveCycle,
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
