import styled from 'styled-components'

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;

    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.5rem;
        color: ${(props) => props.theme['gray-100']};
    }
`

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table {
        width: 100%;
        min-width: 600px;
        border-collapse: collapse;

        th {
            background-color: ${(props) => props.theme['gray-600']};
            color: ${(props) => props.theme['gray-100']};
            padding: 1rem;
            text-align: left;
            font-weight: 0.875rem;
            line-height: 1.6;

            &:first-child {
                border-top-left-radius: 8px;
                margin-left: 1.5rem;
            }

            &:last-child {
                border-top-right-radius: 8px;
                margin-right: 1.5rem;
            }
        }

        td {
            background-color: ${(props) => props.theme['gray-700']};
            border-top: 4px solid ${(props) => props.theme['gray-800']};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                margin-left: 1.5rem;
            }

            &:last-child {
                margin-right: 1.5rem;
            }
        }
    }
`
const STATUS_COLORS = {
    red: 'red-500',
    yellow: 'yellow-500',
    green: 'green-500',
} as const

interface StatusCircleProps {
    statusColor: 'red' | 'yellow' | 'green'
}

export const StatusCircle = styled.span<StatusCircleProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
    }
`
