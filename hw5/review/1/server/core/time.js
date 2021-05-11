const getTime = () => {
    let date = new Date();

    let year = date.getFullYear();
    let month = (date.getMonth() +1);
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return formateTime(year, month, day, hour, minute, second);
}

const formateTime = (year, month, day, hour, minute, second) => {
    return makeDoubleDigit(year) + "-" + 
            makeDoubleDigit(month) + "-" + 
            makeDoubleDigit(day) + "-" + 
            makeDoubleDigit(hour) + "-" + 
            makeDoubleDigit(minute) + "-" + 
            makeDoubleDigit(second);
}

const makeDoubleDigit = (x) => {
    return (x < 10) ? "0" + x : x;
}

export default getTime
