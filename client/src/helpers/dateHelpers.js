export const formatDate = (date) => {
    const dayOfWeek = date.getDay()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const month = date.getMonth()
    const dayOfMonth = date.getDate()
    const year = date.getFullYear()

    return `${daysOfWeek[dayOfWeek]}, ${monthsOfYear[month]} ${dayOfMonth}, ${year} at ${generatePeriodHour(hours, minutes)}`
}

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const generatePeriodHour = (hour, minute) => {
    const formattedHour = hour > 12 ? hour - 12 : hour
    const period  = hour >= 12 ? 'PM' : 'AM'
    return formattedHour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0') + ' ' + period
}
