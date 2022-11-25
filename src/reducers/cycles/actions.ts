import { Cycle } from '../../contexts/CycleContextProvider'

export enum ActionTypes {
    // eslint-disable-next-line no-unused-vars
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    // eslint-disable-next-line no-unused-vars
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
    // eslint-disable-next-line no-unused-vars
    MARK_CURRENT_CYCLE_AS_INTERRUPTED = 'MARK_CURRENT_CYCLE_AS_INTERRUPTED',
}

export type ActionTypesProps =
    | { type: ActionTypes.ADD_NEW_CYCLE; payload: Cycle }
    | { type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED }
    | { type: ActionTypes.MARK_CURRENT_CYCLE_AS_INTERRUPTED }

export function addNewCycleAction(newCycle: Cycle): ActionTypesProps {
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
            ...newCycle,
        },
    }
}

export function markCurrentCycleAsFinishedAction(): ActionTypesProps {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    }
}

export function markCurrentCycleAsInterruptedAction(): ActionTypesProps {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_INTERRUPTED,
    }
}
