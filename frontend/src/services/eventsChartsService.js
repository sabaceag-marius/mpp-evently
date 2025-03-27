import moment from "moment";


export function categoryData(data){
    
    let result = {
    }

    data.forEach(el => {
        if(result[el.categoryName] === undefined){
            result[el.categoryName] = 1;
        }
        else result[el.categoryName] += 1;
    });

    return result;

}

export function eventCountByDayChart(data){

    let result = {

    }

    data.forEach(el => {
        const day = moment(el.startDate).format('ddd');

        if(result[day] === undefined){
            result[day] = 1;
        }
        else result[day] += 1;
    })

    return result;
}

export function hoursPerCategoryChart(data){

    let result = {};


    data.forEach(el => {

        const nr = moment.duration(moment(el.endDate).diff(moment(el.startDate))).asHours()

        if(result[el.categoryName] === undefined){
            result[el.categoryName] = nr;
        }
        else result[el.categoryName] += nr;
    });

    return result;
}