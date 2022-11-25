import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContextProvider'
import { HistoryContainer, HistoryList, StatusCircle } from './styles'

export function History() {
    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Início</th>
                        <th>Status</th>
                    </thead>

                    <tbody>
                        {cycles.map((cycle) => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>Há cerca de 1 hora</td>
                                    <td>
                                        {cycle.interruptedDate ? (
                                            <tr>
                                                <StatusCircle statusColor="red">
                                                    Interrompido
                                                </StatusCircle>
                                            </tr>
                                        ) : cycle.finishedDate ? (
                                            <tr>
                                                <StatusCircle statusColor="green">
                                                    Concluído
                                                </StatusCircle>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <StatusCircle statusColor="yellow">
                                                    Em andamento
                                                </StatusCircle>
                                            </tr>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
