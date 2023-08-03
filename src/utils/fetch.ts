const fetcher = async (url: string, body: object) => {
    if (typeof url != 'string') return false;
    const result = await fetch(`http://localhost:5099/api/${url}`, body);
    const resultJSON = await result.json();
    return resultJSON;
}

export default fetcher;