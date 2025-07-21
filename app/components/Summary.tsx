import React from 'react'

type SummaryProps = {
    feedback: Feedback;
}

const Summary = ({ feedback }: SummaryProps) => {
    return (
        <div>Summary: {JSON.stringify(feedback)}</div>
    )
}
export default Summary 