export const transformedISO = timeString => {
    return new Date(timeString).toString().slice(0, 15)
}