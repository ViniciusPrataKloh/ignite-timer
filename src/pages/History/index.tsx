import { HistoryContainer, HistoryList, StatusCircle } from './styles'

export function History() {
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
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
