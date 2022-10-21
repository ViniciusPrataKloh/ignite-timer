import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
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

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo mínimo é de 5 minutos')
        .max(60, 'O clico máximo é de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { register, handleSubmit, watch, formState } =
        useForm<NewCycleFormData>({
            resolver: zodResolver(newCycleFormValidationSchema),
            defaultValues: {
                task: '',
                minutesAmount: 0,
            },
        })

    function handleSubmitForm(data: NewCycleFormData): void {
        console.log(data)
    }

    console.log(formState.errors)

    const task = watch('task')
    const minutesAmount = watch('minutesAmount')
    const isInputEmpty: boolean = !task || !minutesAmount

    return (
        <HomeContainer>
            <form
                action=""
                id="timerForm"
                onSubmit={handleSubmit(handleSubmitForm)}
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
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
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
