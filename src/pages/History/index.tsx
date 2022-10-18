import { HistoryContainer, HistoryList } from './styles'

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
                            <td>Andamento</td>
                        </tr>
                        <tr>
                            <td>Criar o projeto Ignite Timer</td>
                            <td>6 horas</td>
                            <td>Há cerca de 1 hora</td>
                            <td>Andamento</td>
                        </tr>
                        <tr>
                            <td>Criar o projeto Ignite Timer</td>
                            <td>6 horas</td>
                            <td>Há cerca de 1 hora</td>
                            <td>Andamento</td>
                        </tr>
                        <tr>
                            <td>Criar o projeto Ignite Timer</td>
                            <td>6 horas</td>
                            <td>Há cerca de 1 hora</td>
                            <td>Andamento</td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
