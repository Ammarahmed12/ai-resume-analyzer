import React from 'react'

type DetailsProps = {
    feedback: Feedback;
}

const Details = ({ feedback }: DetailsProps) => {
    return (
        <div>Details: {JSON.stringify(feedback)}</div>
    )
}
export default Details 