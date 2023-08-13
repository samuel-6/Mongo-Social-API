function formatDate(unixTimestamp) {

    const newDate = new Date(unixTimestamp);

    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();

    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

}

module.exports = formatDate;