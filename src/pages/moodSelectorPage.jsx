export function MoodSelector() {

    return (
        <>
            <div id="mainContainer">
                <div id="container" className="d-flex flex-column justify-content-around">
                    <div className="d-flex flex-row justify-content-center flex-wrap">
                        <button className="btn btn-light rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-light rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-light rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-dark rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-light rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-light rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-dark rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-light rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-light rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-light rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-light rounded-pill moodBtn">Happy 😀</button>
                        <button className="btn btn-light rounded-pill moodBtn">Happy 😀</button>
                    </div>
                    <div>
                        <p className="fs-4">Last mood entry: <span>😀😀😀</span></p>
                    </div>
                    <div className="d-flex flex-row justify-content-end">
                        <button className="btn btn-dark rounded">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}