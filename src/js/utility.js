export function getFormattedDate()  {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

export async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json()
        return data

    } catch(err) {
        console.log(err)
    }
}