import { Cycle } from '../../contexts/CycleContextProvider'

export enum ActionTypes {
    // eslint-disable-next-line no-unused-vars
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    // eslint-disable-next-line no-unused-vars
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
    // eslint-disable-next-line no-unused-vars
    MARK_CURRENT_CYCLE_AS_INTERRUPTED = 'MARK_CURRENT_CYCLE_AS_INTERRUPTED',
}

export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
            newCycle,
        },
    }
}

export function markCurrentCycleAsFinishedAction(activeCycleId: string) {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
        payload: {
            activeCycleId,
        },
    }
}

export function markCurrentCycleAsInterruptedAction(activeCycleId: string) {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_INTERRUPTED,
        payload: {
            activeCycleId,
        },
    }
}