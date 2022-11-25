import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../contexts/CycleContextProvider'
import { CountdownContainer, Separator } from './styles'

export function CountDown() {
    const {
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        handleSetCycles,
        handleSetAmountSecondsPassed,
        handleStopActiveCycle,
    } = useContext(CyclesContext)

    console.log(activeCycle)

    const secondsAmount = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? secondsAmount - amountSecondsPassed : 0

    const minutes = String(Math.floor(currentSeconds / 60)).padStart(2, '0')
    const seconds = String(currentSeconds % 60).padStart(2, '0')

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined

        if (activeCycle) {
            interval = setInterval(() => {
                const differenceSecondsPast = differenceInSeconds(
                    new Date(),
                    new Date(activeCycle.startDate),
                )

                if (differenceSecondsPast >= secondsAmount) {
                    handleStopActiveCycle()
                    handleSetAmountSecondsPassed(secondsAmount)
                    clearInterval(interval)
                } else {
                    handleSetAmountSecondsPassed(differenceSecondsPast)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [
        activeCycle,
        activeCycleId,
        handleSetAmountSecondsPassed,
        handleSetCycles,
        handleStopActiveCycle,
        secondsAmount,
    ])

    useEffect(() => {
        if (activeCycle) {
            document.title = `${activeCycle.task} - ${minutes}:${seconds}`
        }

        return () => {
            document.title = 'Ignite Timer'
        }
    }, [minutes, seconds, activeCycle])

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}
