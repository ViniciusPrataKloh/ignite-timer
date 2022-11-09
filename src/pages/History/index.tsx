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
                                        {!(
                                            cycle.interruptedDate ||
                                            cycle.finishedDate
                                        ) ? (
                                            <tr>
                                                <StatusCircle statusColor="yellow">
                                                    Em andamento
                                                </StatusCircle>
                                            </tr>
                                        ) : cycle.interruptedDate ? (
                                            <td>
                                                <StatusCircle statusColor="red">
                                                    Interrompido
                                                </StatusCircle>
                                            </td>
                                        ) : (
                                            <td>
                                                <StatusCircle statusColor="green">
                                                    Concluído
                                                </StatusCircle>
                                            </td>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                    {/* <tbody>
                        <tr>
                            <td>Criar o projeto Ignite Timer</td>
                            <td>6 horas</td>
                            <td>Há cerca de 1 hora</td>
                            <td>
                                <StatusCircle statusColor="yellow">
                                    Em andamento
                                </StatusCircle>
                            </td>
                        </tr>
                        <tr>
                            <td>Criar o projeto Ignite Timer</td>
                            <td>6 horas</td>
                            <td>Há cerca de 1 hora</td>
                            <td>
                                <StatusCircle statusColor="green">
                                    Concluído
                                </StatusCircle>
                            </td>
                        </tr>
                        <tr>
                            <td>Criar o projeto Ignite Timer</td>
                            <td>6 horas</td>
                            <td>Há cerca de 1 hora</td>
                            <td>
                                <StatusCircle statusColor="yellow">
                                    Em andamento
                                </StatusCircle>
                            </td>
                        </tr>
                        <tr>
                            <td>Criar o projeto Ignite Timer</td>
                            <td>6 horas</td>
                            <td>Há cerca de 1 hora</td>
                            <td>
                                <StatusCircle statusColor="red">
                                    Interrompido
                                </StatusCircle>
                            </td>
                        </tr> */}
                    {/* </tbody> */}
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
