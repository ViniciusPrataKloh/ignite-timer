import { differenceInSeconds } from 'date-fns'
import {
    createContext,
    ReactNode,
    useEffect,
    useReducer,
    useState,
} from 'react'
import {
    addNewCycleAction,
    markCurrentCycleAsFinishedAction,
    markCurrentCycleAsInterruptedAction,
} from '../reducers/cycles/actions'
import { CyclesStateReducer } from '../reducers/cycles/reducer'

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
    const [cyclesState, dispatch] = useReducer(
        CyclesStateReducer,
        {
            cycles: [],
            activeCycleId: null,
        },
        () => {
            const storedCyclesStateAsJSON = localStorage.getItem(
                '@ignite-timer:cycles-state-1.0.0',
            )

            if (storedCyclesStateAsJSON) {
                return JSON.parse(storedCyclesStateAsJSON)
            }
        },
    )

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cyclesState.cycles.find(
        (cycle) => cycle.id === cyclesState.activeCycleId,
    )

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate),
            )
        }
        return 0
    })

    function handleSetCycles(newCycle: Cycle) {
        // setCycles((state) => [...state, newCycle])
        // setActiveCycleId(newCycle.id)
    }

    function handleSetAmountSecondsPassed(newAmountSecondsPassed: number) {
        setAmountSecondsPassed(newAmountSecondsPassed)
    }

    function handleStartNewCycle(newCycle: Cycle) {
        dispatch(addNewCycleAction(newCycle))
    }

    function handleStopActiveCycle() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function handleInterruptActiveCycle() {
        dispatch(markCurrentCycleAsInterruptedAction())
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
