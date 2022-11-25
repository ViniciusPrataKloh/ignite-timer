import { Cycle } from '../../contexts/CycleContextProvider'
import { ActionTypes } from './actions'

interface ICyclesState {
    cycles: Cycle[]
    activeCycleId: any
}

export function CyclesStateReducer(state: ICyclesState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id,
            }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
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
        case ActionTypes.MARK_CURRENT_CYCLE_AS_INTERRUPTED:
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
        default:
            return state
    }
}
