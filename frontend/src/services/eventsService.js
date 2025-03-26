// import {data} from "./data";
import moment from "moment";
import assert from "assert";
const data = [
    { id: 1, userName: "Mark", name: "Team Meeting", description: "Weekly team sync-up.", startDate: "2025-03-18T09:00:00Z", endDate: "2025-03-18T10:00:00Z", categoryName: "Work" },
    { id: 2, userName: "Mark", name: "Project Deadline", description: "Submit final project report.", startDate: "2025-03-18T15:00:00Z", endDate: "2025-03-18T17:00:00Z", categoryName: "School" },
    { id: 3, userName: "Mark", name: "Workout", description: "Gym session.", startDate: "2025-03-18T18:00:00Z", endDate: "2025-03-18T19:30:00Z", categoryName: "Personal" },
    { id: 4, userName: "Mark", name: "Client Call", description: "Call with the new client.", startDate: "2025-03-18T11:00:00Z", endDate: "2025-03-18T12:00:00Z", categoryName: "Work" },
    { id: 5, userName: "Mark", name: "Study Session", description: "Prepare for upcoming exam.", startDate: "2025-03-18T20:00:00Z", endDate: "2025-03-18T22:00:00Z", categoryName: "School" },
    
    { id: 6, userName: "Mark", name: "Morning Run", description: "Jogging at the park.", startDate: "2025-03-19T06:30:00Z", endDate: "2025-03-19T07:30:00Z", categoryName: "Personal" },
    { id: 7, userName: "Mark", name: "Code Review", description: "Review PRs from teammates.", startDate: "2025-03-19T10:00:00Z", endDate: "2025-03-19T11:30:00Z", categoryName: "Work" },
    { id: 8, userName: "Mark", name: "Lunch with Mentor", description: "Discuss career growth.", startDate: "2025-03-19T12:30:00Z", endDate: "2025-03-19T13:30:00Z", categoryName: "Personal" },
    { id: 9, userName: "Mark", name: "Research Paper", description: "Work on academic research.", startDate: "2025-03-19T15:00:00Z", endDate: "2025-03-19T17:00:00Z", categoryName: "School" },
    { id: 10, userName: "Mark", name: "Evening Walk", description: "Relaxing walk outside.", startDate: "2025-03-19T19:00:00Z", endDate: "2025-03-19T19:45:00Z", categoryName: "Personal" },
    
    { id: 11, userName: "Mark", name: "Marketing Meeting", description: "Discuss new campaign.", startDate: "2025-03-20T09:30:00Z", endDate: "2025-03-20T10:30:00Z", categoryName: "Work" },
    { id: 12, userName: "Mark", name: "Library Visit", description: "Find resources for project.", startDate: "2025-03-20T13:00:00Z", endDate: "2025-03-20T14:00:00Z", categoryName: "School" },
    { id: 13, userName: "Mark", name: "Dinner with Friends", description: "Catch up with old friends.", startDate: "2025-03-20T19:00:00Z", endDate: "2025-03-20T21:00:00Z", categoryName: "Personal" },
    { id: 14, userName: "Mark", name: "Interview Preparation", description: "Practice for interview.", startDate: "2025-03-20T15:00:00Z", endDate: "2025-03-20T16:30:00Z", categoryName: "Work" },
    { id: 15, userName: "Mark", name: "Yoga Class", description: "Evening yoga session.", startDate: "2025-03-20T17:30:00Z", endDate: "2025-03-20T18:30:00Z", categoryName: "Personal" },
  
    { id: 16, userName: "Mark", name: "Code Debugging", description: "Fixing project bugs.", startDate: "2025-03-21T10:00:00Z", endDate: "2025-03-23T11:30:00Z", categoryName: "Work" },
    { id: 17, userName: "Mark", name: "Presentation Prep", description: "Prepare slides for class.", startDate: "2025-03-21T14:00:00Z", endDate: "2025-03-21T15:30:00Z", categoryName: "School" },
    { id: 18, userName: "Mark", name: "Movie Night", description: "Watch a new film.", startDate: "2025-03-21T19:00:00Z", endDate: "2025-03-21T21:30:00Z", categoryName: "Personal" },
    { id: 19, userName: "Mark", name: "Training Session", description: "Online workshop on skills.", startDate: "2025-03-21T16:00:00Z", endDate: "2025-03-21T17:30:00Z", categoryName: "Work" },
    { id: 20, userName: "Mark", name: "Weekend Planning", description: "Plan upcoming weekend.", startDate: "2025-03-21T22:00:00Z", endDate: "2025-03-21T23:00:00Z", categoryName: "Personal" },
    { id: 21, userName: "Mark", name: "Team Brainstorming", description: "Discuss new project ideas.", startDate: "2025-03-24T10:00:00Z", endDate: "2025-03-24T11:30:00Z", categoryName: "Work" },
    { id: 22, userName: "Mark", name: "Essay Writing", description: "Complete assignment draft.", startDate: "2025-03-25T14:00:00Z", endDate: "2025-03-25T16:00:00Z", categoryName: "School" },
    { id: 23, userName: "Mark", name: "Guitar Practice", description: "Practice new song.", startDate: "2025-03-26T17:00:00Z", endDate: "2025-03-26T18:00:00Z", categoryName: "Personal" },
    { id: 24, userName: "Mark", name: "Networking Event", description: "Meet industry professionals.", startDate: "2025-03-27T18:30:00Z", endDate: "2025-03-27T21:00:00Z", categoryName: "Work" },
    { id: 25, userName: "Mark", name: "Meditation Session", description: "Relaxing mindfulness practice.", startDate: "2025-03-28T07:30:00Z", endDate: "2025-03-28T08:00:00Z", categoryName: "Personal" }
  
  ];  

export async function getEventsAPI(queryData, categories) {
    
    // console.log(queryData,categories);

    // const DEFAULT_QUERY_DATA = {
    //     dateMoment : moment(),
    //     dateInterval : "day",
    //     categories : categories
    // }

    // const pageNumber = 1;
    // const pageSize = 8;
    // const start = (pageNumber - 1)*pageSize;
    // const end = pageNumber * pageSize;

    // const response = data.filter(event => 
    //                         // event.categoryName == queryData.categoryName && 
    //                         moment(queryData.date).dayOfYear >= moment(event.startDate).dayOfYear && 
    //                         moment(queryData.date).dayOfYear <= moment(event.endDate).dayOfYear
    // ).sort((a,b) => moment(a.startDate).isBefore(moment(b.startDate)) ? -1 : 1);
    // .slice(start,end);

    const startTimeInterval = queryData.dateMoment.clone().startOf(queryData.dateInterval);
    const endTimeInterval = queryData.dateMoment.clone().endOf(queryData.dateInterval);
    
    let response = data.filter(event =>
        startTimeInterval <= moment(event.startDate) &&
        moment(event.startDate) <= endTimeInterval &&
        queryData.categories.includes(event.categoryName)
    )   
    
    const result = response.sort((a,b) => moment(a.startDate).isBefore(moment(b.startDate)) ? -1 : 1);
    // console.log(result);
    return result;
}



export async function getEventAPI(id) {
    return data.filter(e => e.id === id)[0];
}

export async function addEventAPI(event){

    const errors = validateEvent(event);

    if(errors.length > 0) return errors;

    const eventId = Math.max(...data.map(event => event.id)) + 1;

    data.push({
        id : eventId,
        ...event
    });

}

export async function updateEventAPI(id,event){

    const errors = validateEvent(event);

    if(errors.length > 0) return errors;

    const newEvent = {
        id: id,
        ...event
    };
    validateEvent(newEvent);

    await deleteEventAPI(id);

    data.push(newEvent);
    
}

export async function deleteEventAPI(id) {
    
    const index = data.indexOf(data.filter(e => e.id === id)[0]);
    data.splice(index,1);
}

function validateEvent(event){
    let errors = []

    if(event.name === "") errors.push('Name is required')

    if(moment(event.endDate).isBefore(moment(event.startDate)))
        errors.push('End date must be after start date');

    if(event.categoryName === "") 
        errors.push('Category is required');
    return errors;
}

function validateEventDetailed(event){
    let valid = true;

    let errorObject = {
        name : "",
        description : "",
        startDate : "",
        endDate : "",
        categoryName: "",
    }

    if(event.name === "") {
        valid = false;
        errorObject.name = 'Name is required';
    }

    if(moment(event.endDate).isBefore(moment(event.startDate))){
        valid = false;
         errorObject.endDate = 'End date must be after start date';
    }

    if(event.categoryName === "") {
        valid = false;
        errorObject.categoryName = 'Category is required';
    }

    if(!valid){
        return errorObject;
    }
}

function testFilters(){

    const categories = ['Work', 'School', 'Personal'];

    let queryData = {
        "dateMoment": moment("2025-03-21T10:36:41.855Z"),
        "dateInterval": "day",
        "categories": [
            "Work",
            "School",
            "Personal"
        ]
    };
    let expectedResult = [
        {
            "id": 16,
            "userName": "Mark",
            "name": "Code Debugging",
            "description": "Fixing project bugs.",
            "startDate": "2025-03-21T10:00:00Z",
            "endDate": "2025-03-23T11:30:00Z",
            "categoryName": "Work"
        },
        {
            "id": 17,
            "userName": "Mark",
            "name": "Presentation Prep",
            "description": "Prepare slides for class.",
            "startDate": "2025-03-21T14:00:00Z",
            "endDate": "2025-03-21T15:30:00Z",
            "categoryName": "School"
        },
        {
            "id": 19,
            "userName": "Mark",
            "name": "Training Session",
            "description": "Online workshop on skills.",
            "startDate": "2025-03-21T16:00:00Z",
            "endDate": "2025-03-21T17:30:00Z",
            "categoryName": "Work"
        },
        {
            "id": 18,
            "userName": "Mark",
            "name": "Movie Night",
            "description": "Watch a new film.",
            "startDate": "2025-03-21T19:00:00Z",
            "endDate": "2025-03-21T21:30:00Z",
            "categoryName": "Personal"
        }
    ];

    getEventsAPI(queryData,categories).then(result =>
        assert(result,expectedResult)
    )
    queryData = {
        "dateMoment": moment("2025-03-21T11:17:01.668Z"),
        "dateInterval": "day",
        "categories": [
            "Work"
        ]
    }

    expectedResult = [
        {
            "id": 16,
            "userName": "Mark",
            "name": "Code Debugging",
            "description": "Fixing project bugs.",
            "startDate": "2025-03-21T10:00:00Z",
            "endDate": "2025-03-23T11:30:00Z",
            "categoryName": "Work"
        },
        {
            "id": 19,
            "userName": "Mark",
            "name": "Training Session",
            "description": "Online workshop on skills.",
            "startDate": "2025-03-21T16:00:00Z",
            "endDate": "2025-03-21T17:30:00Z",
            "categoryName": "Work"
        }
    ];

    getEventsAPI(queryData,categories).then(result =>
        assert(result,expectedResult)
    );

    console.log('tests passed!');
}

testFilters();