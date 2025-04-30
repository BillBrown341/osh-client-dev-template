


export default function DisplayCircle({ isObstruction, apiInfoObj }) {

    const { api, apiData } = apiInfoObj

    return (
        <div>
            <div className="DisplayTitles" >{api}</div>
            <div className="DisplayTitles" >{apiData} Data</div>
            <svg width="100" height="120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="circleShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="-0" dy="10" stdDeviation="4" flood-color="black" flood-opacity="0.5" />
                    </filter>
                </defs>
                <circle cx="50" cy="50" r="45" fill={ isObstruction ? "red" : "green"} filter="url(#circleShadow)"/>
                <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="white" fontFamily="Arial, sans-serif">
                    { isObstruction ? "Stop" : "Go"}
                </text>
            </svg>
        </div>



        )



}
