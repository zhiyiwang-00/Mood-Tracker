
export function MoodLog({allMoods, clearMoodHistory}) {

    return (
        <div className="mood-history-display d-flex justify-content-between">
            <div>
                <p>Mood Log History</p>
                {allMoods.map((moodObjects, index) => (
                    <div key={index}>
                        {moodObjects.map((mood, moodIndex) =>
                            mood ? (
                                <span key={moodIndex} title={mood.name} className="fs-3 m-2">
                                    {mood.emoji}
                                </span>
                            ) : null
                        )}
                    </div>
                ))}
            </div>
            <button id="clear_history" onClick={clearMoodHistory}>
                Clear Mood Log History
            </button>
        </div>
    )
}