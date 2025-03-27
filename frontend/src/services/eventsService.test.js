import moment from "moment";
import { 
    data,
    getEventsAPI, 
    getEventAPI, 
    getEventsCountAPI, 
    addEventAPI, 
    updateEventAPI, 
    deleteEventAPI,
    validateEvent 
} from "./eventsService";

describe("Events API", () => {
    const PAGE_SIZE = 5;

    test("getEventsAPI should return filtered and paginated events", async () => {
        const queryData = {
            dateMoment: moment("2025-03-18"),
            dateInterval: "day",
            categories: ["Work", "Personal"]
        };

        const currentPage = 1;
        const result = await getEventsAPI(queryData, currentPage, PAGE_SIZE);

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeLessThanOrEqual(PAGE_SIZE);

        result.forEach(event => {
            const isInCategories = queryData.categories.includes(event.categoryName);
            const isInDateRange = moment(event.startDate).isBetween(
                queryData.dateMoment.clone().startOf(queryData.dateInterval),
                queryData.dateMoment.clone().endOf(queryData.dateInterval),
                undefined,
                "[]"
            );
            expect(isInCategories).toBe(true);
            expect(isInDateRange).toBe(true);
        });
    });

    test("getEventAPI should return a specific event by id", async () => {
        const id = 1;
        const event = await getEventAPI(id);

        expect(event).toBeDefined();
        expect(event.id).toBe(id);
    });

    test("getEventsCountAPI should return the correct count of events", async () => {
        const queryData = {
            dateMoment: moment("2025-03-18"),
            dateInterval: "day",
            categories: ["Work", "Personal"]
        };

        const count = await getEventsCountAPI(queryData);

        expect(typeof count).toBe("number");
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test("addEventAPI should add a new event", async () => {
        const newEvent = {
            name: "Test Event",
            description: "This is a test event.",
            startDate: "2025-03-30T10:00:00Z",
            endDate: "2025-03-30T12:00:00Z",
            categoryName: "Test"
        };

        await addEventAPI(newEvent);
        const maxId = Math.max(...data.map(event => event.id));

        const addedEvent = await getEventAPI(maxId);
        expect(addedEvent).toBeDefined();
        expect(addedEvent.name).toBe(newEvent.name);
    });

    test("updateEventAPI should update an existing event", async () => {
        const id = 1;
        const updatedEvent = {
            name: "Updated Event Name",
            description: "Updated description.",
            startDate: "2025-03-30T10:00:00Z",
            endDate: "2025-03-30T12:00:00Z",
            categoryName: "Updated Category"
        };

        await updateEventAPI(id, updatedEvent);

        const fetchedEvent = await getEventAPI(id);
        expect(fetchedEvent.name).toBe(updatedEvent.name);
        expect(fetchedEvent.description).toBe(updatedEvent.description);
    });

    test("deleteEventAPI should delete an event by id", async () => {
        const id = 1;

        await deleteEventAPI(id);

        const deletedEvent = await getEventAPI(id);
        expect(deletedEvent).toBeUndefined();
    });

    test('should return an empty array when event is valid', () => {
        const event = {
            name: 'Valid Event',
            startDate: '2025-03-18T09:00:00Z',
            endDate: '2025-03-18T10:00:00Z',
            categoryName: 'Work',
        };

        const errors = validateEvent(event);

        expect(errors).toEqual([]); // No errors expected
    });

    test('should return an error when the name is empty', () => {
        const event = {
            name: '',
            startDate: '2025-03-18T09:00:00Z',
            endDate: '2025-03-18T10:00:00Z',
            categoryName: 'Work',
        };

        const errors = validateEvent(event);

        expect(errors).toContain('Name is required');
    });

    test('should return an error when endDate is before startDate', () => {
        const event = {
            name: 'Invalid Event',
            startDate: '2025-03-18T10:00:00Z',
            endDate: '2025-03-18T09:00:00Z',
            categoryName: 'Work',
        };

        const errors = validateEvent(event);

        expect(errors).toContain('End date must be after start date');
    });

    test('should return an error when categoryName is empty', () => {
        const event = {
            name: 'Event without category',
            startDate: '2025-03-18T09:00:00Z',
            endDate: '2025-03-18T10:00:00Z',
            categoryName: '',
        };

        const errors = validateEvent(event);

        expect(errors).toContain('Category is required');
    });
});
