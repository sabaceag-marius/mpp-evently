import moment from "moment";


export const getMoment = (dateString) => moment.utc(dateString);

export const currentMoment = () => moment.utc();

export function toDateTimeInputString(momentt){
    return getMoment(momentt).format("yyyy-MM-DDTHH:mm");
}

export function toDateTimeString(momentDate,timeString){
    return `${getMoment(momentDate).format("yyyy-MM-DDT")}${timeString}Z`;
}

export function toDateInputString(momentt){
    return getMoment(momentt).format("yyyy-MM-DD");
}

export function toTimeInputString(moment_){
    return getMoment(moment_).format("HH:mm");
}

export function getTimeOptions(){

    let data = [];

    for(let hour = 0; hour < 24; hour++){

        for(let minute = 0; minute < 60; minute += 15){
            const hourStr = hour < 10? `0${hour}` : `${hour}`;
            const minuteStr = minute < 10? `0${minute}` : `${minute}`;

            data.push(hourStr+":"+minuteStr);
        }
    }

    return data;
}