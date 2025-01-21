export function AffirmationDisplay({overallMood, affirmationImg, affirmationQuote}) {

    return (
        <div className="affirmation-display">
        {overallMood && (
          <>
            <p>
              Your overall mood has been: <span id="mood_overall">{overallMood || "Unknown"}</span>
            </p>
            {affirmationImg && (
              <img
                id="affirmation_image"
                src={affirmationImg}
                alt={`${overallMood} affirmation`}
              />
            )}
            <br />
            <span>{affirmationQuote}</span>
          </>
        )}
      </div>
    )
}