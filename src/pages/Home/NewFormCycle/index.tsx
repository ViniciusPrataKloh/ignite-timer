import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import * as zod from 'zod'
import { Cycle, CyclesContext } from '../../../contexts/CycleContextProvider'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(1, 'O ciclo mínimo é de 1 minutos')
        .max(60, 'O clico máximo é de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface NewFormCycleProps {
    handleSetIsInputEmpty: (isFormEmpty: boolean) => void
}

export function NewFormCycle({ handleSetIsInputEmpty }: NewFormCycleProps) {
    const { activeCycle, handleSetAmountSecondsPassed, handleStartNewCycle } =
        useContext(CyclesContext)

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

        handleStartNewCycle(newCycle)
        handleSetAmountSecondsPassed(0)

        reset()
    }

    const task = watch('task')
    const minutesAmount = watch('minutesAmount')
    handleSetIsInputEmpty(!task || !minutesAmount)

    return (
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
                    disabled={!!activeCycle}
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
                    min={1}
                    max={60}
                    disabled={!!activeCycle}
                    {...register('minutesAmount', { valueAsNumber: true })}
                />

                <span>minutos.</span>
            </FormContainer>
        </form>
    )
}
