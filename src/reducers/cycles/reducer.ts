import { Cycle } from '../../contexts/CycleContextProvider'
import { ActionTypes, ActionTypesProps } from './actions'
import { produce } from 'immer'

interface ICyclesState {
    cycles: Cycle[]
    activeCycleId: any
}

export function CyclesStateReducer(
    state: ICyclesState,
    action: ActionTypesProps,
) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            // return {
            //     ...state,
            //     cycles: [...state.cycles, action.payload.newCycle],
            //     activeCycleId: action.payload.newCycle.id,
            // }
            return produce(state, (draft) => {
                draft.cycles.push(action.payload)
                draft.activeCycleId = action.payload.id
            })
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
            // return {
            //     ...state,
            //     cycles: state.cycles.map((cycle) => {
            //         if (cycle.id === state.activeCycleId) {
            //             return { ...cycle, finishedDate: new Date() }
            //         } else {
            //             return cycle
            //         }
            //     }),
            //     activeCycleId: null,
            // }
            const currentActivecycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId
            })

            if (currentActivecycleIndex < 0) return state

            return produce(state, (draft) => {
                draft.cycles[currentActivecycleIndex].interruptedDate =
                    new Date()
                draft.activeCycleId = null
            })
        }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_INTERRUPTED: {
            // return {
            //     ...state,
            //     cycles: state.cycles.map((cycle) => {
            //         if (cycle.id === state.activeCycleId) {
            //             return { ...cycle, interruptedDate: new Date() }
            //         } else {
            //             return cycle
            //         }
            //     }),
            //     activeCycleId: null,
            // }
            const currentActivecycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId
            })

            if (currentActivecycleIndex < 0) return state

            return produce(state, (draft) => {
                draft.cycles[currentActivecycleIndex].interruptedDate =
                    new Date()
                draft.activeCycleId = null
            })
        }
        default:
            return state
    }
}
