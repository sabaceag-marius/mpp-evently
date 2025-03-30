import moment from "moment";

export function toDateTimeInputString(momentt){
    return moment(momentt).format("yyyy-MM-DDTHH:mm");
}

export function toDateInputString(momentt){
    return moment(momentt).format("yyyy-MM-DD");
}

export function getRandomTimeBetween(startDate, endDate) {
    // Convert dates to timestamps
    const startTimestamp = moment(startDate).valueOf();
    const endTimestamp = moment(endDate).valueOf();
  
    // Generate a random timestamp between start and end
    const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) + startTimestamp;
  
    // Convert random timestamp back to a Moment.js date
    return moment(randomTimestamp);
  }