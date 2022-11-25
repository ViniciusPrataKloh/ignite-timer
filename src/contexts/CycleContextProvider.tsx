import { createContext, ReactNode, useReducer, useState } from 'react'
import { CyclesStateReducer } from '../reducers/CyclesStateReducer'

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
    handleInterruptActiveCycle: () => void
}

export const CyclesContext = createContext({} as IContextCycle)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(CyclesStateReducer, {
        cycles: [],
        activeCycleId: null,
    })

    // const [cycles, setCycles] = useState<Cycle[]>([])
    // const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { cycles, activeCycleId } = cyclesState

    const activeCycle = cyclesState.cycles.find(
        (cycle) => cycle.id === cyclesState.activeCycleId,
    )

    function handleSetCycles(newCycle: Cycle) {
        // setCycles((state) => [...state, newCycle])
        // setActiveCycleId(newCycle.id)
    }

    function handleSetAmountSecondsPassed(newAmountSecondsPassed: number) {
        setAmountSecondsPassed(newAmountSecondsPassed)
    }

    function handleStartNewCycle(newCycle: Cycle) {
        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle,
            },
        })
        // setActiveCycleId(newCycle.id)
    }

    function handleStopActiveCycle() {
        // setCycles((state) =>
        //     state.map((cycle) => {
        //         if (cycle.id === activeCycleId) {
        //             return { ...cycle, finishedDate: new Date() }
        //         } else {
        //             return cycle
        //         }
        //     }),
        // )
        // setActiveCycleId(null)
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId,
            },
        })
    }

    function handleInterruptActiveCycle() {
        // setCycles((state) =>
        //     state.map((cycle) => {
        //         if (cycle.id === activeCycleId) {
        //             return { ...cycle, interruptedDate: new Date() }
        //         } else {
        //             return cycle
        //         }
        //     }),
        // )
        // setActiveCycleId(null)
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_INTERRUPTED',
            payload: {
                activeCycleId,
            },
        })
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
                handleInterruptActiveCycle,
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
