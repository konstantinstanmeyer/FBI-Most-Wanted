function ScoreCounter({points, isRed}) {
    const emptyCircle = (
        <div className="rps-circle" style={{background:"var(--background-color)"}}></div>
    )
    const fullCircle = (
        <div className="rps-circle" style={{background:(isRed? "red": "yellow")}}></div>
    )

    return (
        <div className="panel scorecounter">
            { [...Array(5-points).fill(emptyCircle), ...Array(points).fill(fullCircle)] }
        </div>
    )
}

export default ScoreCounter