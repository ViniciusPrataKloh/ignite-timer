import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { v4 as uuid } from 'uuid'
import { differenceInSeconds } from 'date-fns'
import {
    CountdownContainer,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountdownButton,
    // eslint-disable-next-line prettier/prettier
    TaskInput
} from './styles'
import { useEffect, useState } from 'react'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo mínimo é de 5 minutos')
        .max(60, 'O clico máximo é de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })

    function handleCreateNewCycle(data: NewCycleFormData): void {
        const id = uuid()

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)

        reset()
    }

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    useEffect(() => {
        if (activeCycle) {
            setInterval(() => {
                setAmountSecondsPassed(
                    differenceInSeconds(new Date(), activeCycle.startDate),
                )
            }, 1000)
        }
    }, [activeCycle])

    const secondsAmount = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? secondsAmount - amountSecondsPassed : 0

    const minutes = String(Math.floor(currentSeconds / 60)).padStart(2, '0')
    const seconds = String(currentSeconds % 60).padStart(2, '0')

    const task = watch('task')
    const minutesAmount = watch('minutesAmount')
    const isInputEmpty: boolean = !task || !minutesAmount

    return (
        <HomeContainer>
            <form
                action=""
                id="timerForm"
                onSubmit={handleSubmit(handleCreateNewCycle)}
            >
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                        <option value="Projeto 4" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        type="number"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCountdownButton
                    type="submit"
                    form="timerForm"
                    disabled={isInputEmpty}
                >
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}
