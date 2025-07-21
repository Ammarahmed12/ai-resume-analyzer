import React from 'react'

type AtsProps = {
    score: number;
    suggestions: { type: 'good' | 'improve'; tip: string }[];
}

const ATS = ({ score, suggestions }: AtsProps) => {
    return (
        <div>
            <div>ATS Score: {score}</div>
            <ul>
                {suggestions.map((s, i) => (
                    <li key={i}>{s.type}: {s.tip}</li>
                ))}
            </ul>
        </div>
    )
}
export default ATS 