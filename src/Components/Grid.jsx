function Grid({children}) {
    return (
        <ul className={`flex gap-6`}>
            {children.map((child, i) => <li key={i}>{child}</li>)}
        </ul>
    )
}

export default Grid
