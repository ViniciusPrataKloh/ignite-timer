import { createContext, ReactNode, useReducer, useState } from 'react'

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

interface IAction {
    // eslint-disable-next-line prettier/prettier
    type: 'ADD_NEW_CYCLE' | 'MARK_CURRENT_CYCLE_AS_FINISHED' | 'MARK_CURRENT_CYCLE_AS_INTERRUPTED'
    payload: any
}

interface ICyclesState {
    cycles: Cycle[]
    activeCycleId: any
}

export const CyclesContext = createContext({} as IContextCycle)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        (state: ICyclesState, action: IAction) => {
            if (action.type === 'ADD_NEW_CYCLE') {
                return {
                    ...state,
                    cycles: [...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id,
                }
            }

            if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === action.payload.activeCycleId) {
                            return { ...cycle, finishedDate: new Date() }
                        } else {
                            return cycle
                        }
                    }),
                    activeCycleId: null,
                }
            }

            if (action.type === 'MARK_CURRENT_CYCLE_AS_INTERRUPTED') {
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === action.payload.activeCycleId) {
                            return { ...cycle, interruptedDate: new Date() }
                        } else {
                            return cycle
                        }
                    }),
                    activeCycleId: null,
                }
            }

            return state
        },
        {
            cycles: [],
            activeCycleId: null,
        },
    )

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
