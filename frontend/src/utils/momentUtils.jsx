import moment from "moment";

export function toDateTimeInputString(momentt){
    return moment(momentt).format("yyyy-MM-DDTHH:mm");
}

export function toDateInputString(momentt){
    return moment(momentt).format("yyyy-MM-DD");
}