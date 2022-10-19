import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
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

export function Home() {
    const { register, handleSubmit, watch } = useForm()

    function handleSubmitForm(data: any) {
        console.log(data)
    }

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
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
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
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register('task')}
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
                    {...register('minutesAmount')}
                >
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}
