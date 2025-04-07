import moment from "moment";

export function toDateTimeInputString(momentt){
    return moment(momentt).format("yyyy-MM-DDTHH:mm");
}

export function toDateTimeString(momentDate,timeString){
    return `${moment(momentDate).format("yyyy-MM-DDT")}${timeString}Z`;
}

export function toDateInputString(momentt){
    return moment(momentt).format("yyyy-MM-DD");
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