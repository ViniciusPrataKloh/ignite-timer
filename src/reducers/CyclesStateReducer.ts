import { Cycle } from '../contexts/CycleContextProvider'

interface IAction {
    // eslint-disable-next-line prettier/prettier
    type: 'ADD_NEW_CYCLE' | 'MARK_CURRENT_CYCLE_AS_FINISHED' | 'MARK_CURRENT_CYCLE_AS_INTERRUPTED'
    payload: any
}

interface ICyclesState {
    cycles: Cycle[]
    activeCycleId: any
}

// interface CyclesStateReducerProps{
//     state: ICyclesState
//     action: IAction
// }

export function CyclesStateReducer(state: ICyclesState, action: IAction) {
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
}
