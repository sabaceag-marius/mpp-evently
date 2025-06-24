using Domain.Common.Specifications;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using System.Globalization;

namespace Infrastructure.Repositories;

public class EventMemoryRepository : IEventRepository
{
    private Dictionary<Guid, Event> data;

    public EventMemoryRepository()
    {
        InitializeRepo();
    }

    public async Task<IEnumerable<Event>> GetAllDataAsync()
    {
        return data.Values.ToList();
    }

    public async Task<Event> GetByIdAsync(Guid id)
    {
        if (!data.ContainsKey(id)) return new Event();

        return data[id];
    }

    public async Task<Event?> GetByIdNoTracking(Guid id)
    {
        if (!data.ContainsKey(id)) return new Event();

        return data[id];
    }

    public Event? Add(Event e)
    {
        if (!data.TryAdd(e.Id, e)) return new Event();

        return e;
    }

    public async Task<Event?> UpdateAsync(Event e)
    {
        data[e.Id] = e;

        return e;
    }

    public async Task DeleteAsync(Event e)
    {
        data.Remove(e.Id);
    }

    public async Task<IEnumerable<Event>> GetFilteredEventsAsync(Specification<Event> filters, int pageNumber, int pageSize)
    {
        return data.Values.Where(filters.Expr.Compile())
            .OrderBy(e => e.StartDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize);
    }

    public async Task<IEnumerable<Event>> GetAllFilteredEventsAsync(Specification<Event> filters)
    {
        throw new NotImplementedException();
    }

    public async Task<int> GetFilteredEventsCountAsync(Specification<Event> filters)
    {
        return data.Values.Where(filters.Expr.Compile())
            .OrderBy(e => e.StartDate)
            .Count();
    }

    public async Task<IEnumerable<Event>> GetFilteredEventsAsync(Specification<Event> filters)
    {
        throw new NotImplementedException();
    }

    void InitializeRepo()
    {
        var list = new[]
{
    new { Id = Guid.Parse("835bb5bf-79c6-4c88-8975-4b65ede789de"), Name = "Team Meeting", Username = "Mark", Description = "Weekly team sync-up.", StartDate = "2025-04-01T09:00:00Z", EndDate = "2025-04-01T10:00:00Z", Category = "Work" },
    new { Id = Guid.Parse("42b1c981-6915-48c8-a76b-79814f7c555d"), Name = "Project Deadline", Username = "Mark", Description = "Submit final project report.", StartDate = "2025-04-01T15:00:00Z", EndDate = "2025-04-01T17:00:00Z", Category = "School" },
    new { Id = Guid.Parse("af96e73b-e7a1-49be-bc08-fa81a47d45f5"), Name = "Workout", Username = "Mark", Description = "Gym session.", StartDate = "2025-04-01T18:00:00Z", EndDate = "2025-04-01T19:30:00Z", Category = "Personal" },
    new { Id = Guid.Parse("8da959cb-1704-445c-bd30-6ceb7d20382b"), Name = "Client Call", Username = "Mark", Description = "Call with the new client.", StartDate = "2025-04-01T11:00:00Z", EndDate = "2025-04-01T12:00:00Z", Category = "Work" },
    new { Id = Guid.Parse("48f4fe5f-2f28-49c4-9259-2966540c958b"), Name = "Study Session", Username = "Mark", Description = "Prepare for upcoming exam.", StartDate = "2025-04-01T20:00:00Z", EndDate = "2025-04-01T22:00:00Z", Category = "School" },
    new { Id = Guid.Parse("488d6660-1a0d-4810-a9ee-37c596b1b1a3"), Name = "Events 1", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T05:00:00Z", EndDate = "2025-04-24T06:00:00Z", Category = "Work" },
    new { Id = Guid.Parse("29f3d4c5-b89a-41a1-beff-938bcb5fa96f"), Name = "Events 2", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T12:30:00Z", EndDate = "2025-04-24T13:15:00Z", Category = "Personal" },
    new { Id = Guid.Parse("d5a197ae-9241-44ae-a285-5b665e3376cb"), Name = "Events 3", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T22:30:00Z", EndDate = "2025-04-25T00:00:00Z", Category = "Work" },
    new { Id = Guid.Parse("df0df562-5737-46b3-92e3-c1827e232e3f"), Name = "Events 4", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T08:45:00Z", EndDate = "2025-04-24T09:30:00Z", Category = "Personal" },
    new { Id = Guid.Parse("1c32de58-9ba7-443b-b361-a9747190758a"), Name = "Events 5", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T16:45:00Z", EndDate = "2025-04-24T17:15:00Z", Category = "School" },
    new { Id = Guid.Parse("ca800708-784a-4cb2-95a6-795aa1b1e064"), Name = "Events 6", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T00:45:00Z", EndDate = "2025-04-24T02:15:00Z", Category = "Personal" },
    new { Id = Guid.Parse("2a50450b-9528-499b-8f1b-506937014789"), Name = "Events 7", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T12:00:00Z", EndDate = "2025-04-24T13:30:00Z", Category = "Personal" },
    new { Id = Guid.Parse("90429f57-c6e1-4108-b3ca-e5c00d021d09"), Name = "Events 8", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T03:15:00Z", EndDate = "2025-04-24T04:45:00Z", Category = "School" },
    new { Id = Guid.Parse("f949423e-800a-42b0-850b-716e0f12a469"), Name = "Events 9", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T19:15:00Z", EndDate = "2025-04-24T20:15:00Z", Category = "Work" },
    new { Id = Guid.Parse("746f5584-33ba-4b55-9667-8ec5982c8b43"), Name = "Events 10", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T12:00:00Z", EndDate = "2025-04-24T12:45:00Z", Category = "Work" },
    new { Id = Guid.Parse("94cf296c-c74e-4722-9f74-a418a5c597e8"), Name = "Events 11", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T03:15:00Z", EndDate = "2025-04-24T03:45:00Z", Category = "Personal" },
    new { Id = Guid.Parse("2ec8749b-0815-457d-ac01-e2adffd9f400"), Name = "Events 12", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T14:00:00Z", EndDate = "2025-04-24T15:30:00Z", Category = "Work" },
    new { Id = Guid.Parse("88f3900d-12c9-465a-8113-d159e005c2b4"), Name = "Events 13", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T20:00:00Z", EndDate = "2025-04-24T20:30:00Z", Category = "Personal" },
    new { Id = Guid.Parse("cb937269-b2e4-4fac-a826-30c82a0ec964"), Name = "Events 14", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T20:00:00Z", EndDate = "2025-04-24T21:00:00Z", Category = "Personal" },
    new { Id = Guid.Parse("de0c93ff-dfab-4544-8ecd-b6f357c2e618"), Name = "Events 15", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T09:00:00Z", EndDate = "2025-04-24T09:30:00Z", Category = "Work" },
    new { Id = Guid.Parse("ebeff3e0-2fc1-4b31-94e7-17af32ef3dbf"), Name = "Events 16", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T03:00:00Z", EndDate = "2025-04-24T03:45:00Z", Category = "Personal" },
    new { Id = Guid.Parse("ae9cbd5e-ec5d-4277-a729-e8cf18ca542f"), Name = "Events 17", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T04:30:00Z", EndDate = "2025-04-24T05:15:00Z", Category = "Personal" },
    new { Id = Guid.Parse("1f8b1c46-afde-46e4-9fde-a8f67da0b34b"), Name = "Events 18", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T07:15:00Z", EndDate = "2025-04-24T08:45:00Z", Category = "School" },
    new { Id = Guid.Parse("ea945b80-3370-41b8-8fca-96937f829016"), Name = "Events 19", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T21:30:00Z", EndDate = "2025-04-24T23:00:00Z", Category = "Work" },
    new { Id = Guid.Parse("20306ff6-a59b-46f2-b781-fa7771c5a78a"), Name = "Events 20", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T16:15:00Z", EndDate = "2025-04-24T17:15:00Z", Category = "School" },
    new { Id = Guid.Parse("74287feb-1ffb-4c70-a779-bc543fd2e0bb"), Name = "Events 21", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T04:30:00Z", EndDate = "2025-04-24T05:00:00Z", Category = "Personal" },
    new { Id = Guid.Parse("0494ee41-74ae-4ac3-b32f-8204cf4a353b"), Name = "Events 22", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T16:15:00Z", EndDate = "2025-04-24T17:15:00Z", Category = "School" },
    new { Id = Guid.Parse("57a52e16-57e4-4dcb-bf8c-8459329f350f"), Name = "Events 23", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T21:15:00Z", EndDate = "2025-04-24T22:15:00Z", Category = "Work" },
    new { Id = Guid.Parse("ad8c3cb2-5e09-4c97-b90d-124ae445bf42"), Name = "Events 24", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T16:00:00Z", EndDate = "2025-04-24T17:30:00Z", Category = "School" },
    new { Id = Guid.Parse("dcb66753-665b-4f22-b07f-35935881aef8"), Name = "Events 25", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T09:00:00Z", EndDate = "2025-04-24T09:45:00Z", Category = "Work" },
    new { Id = Guid.Parse("aa6f7c09-b029-4de9-bb94-0a632350e9a8"), Name = "Events 26", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T16:30:00Z", EndDate = "2025-04-24T17:15:00Z", Category = "School" },
    new { Id = Guid.Parse("8ea2d364-fe82-4a06-a259-d12898adc70b"), Name = "Events 27", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T21:00:00Z", EndDate = "2025-04-24T21:45:00Z", Category = "Personal" },
    new { Id = Guid.Parse("b007a51f-02ce-4c0a-ae6f-d2c827880d86"), Name = "Events 28", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T11:15:00Z", EndDate = "2025-04-24T12:15:00Z", Category = "School" },
    new { Id = Guid.Parse("cc030db2-cd39-4d2f-b35d-134c4346e419"), Name = "Events 29", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T06:45:00Z", EndDate = "2025-04-24T07:45:00Z", Category = "Work" },
    new { Id = Guid.Parse("1c55a557-028c-46f7-a4c5-879bc18e831a"), Name = "Events 30", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T00:45:00Z", EndDate = "2025-04-24T01:15:00Z", Category = "Personal" },
    new { Id = Guid.Parse("ede58a1e-f997-4ce1-9094-93ffc2f9cf2b"), Name = "Events 31", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T02:30:00Z", EndDate = "2025-04-24T03:15:00Z", Category = "School" },
    new { Id = Guid.Parse("7fef6dda-62f3-42e2-9b6e-99115456d075"), Name = "Events 32", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T15:30:00Z", EndDate = "2025-04-24T16:30:00Z", Category = "Personal" },
    new { Id = Guid.Parse("4681c190-60f4-4905-b12a-b1e706e7358a"), Name = "Events 33", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T02:45:00Z", EndDate = "2025-04-24T04:15:00Z", Category = "School" },
    new { Id = Guid.Parse("40645186-387e-4ca1-8191-a61d95204c52"), Name = "Events 34", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T18:00:00Z", EndDate = "2025-04-24T18:30:00Z", Category = "Work" },
    new { Id = Guid.Parse("d6f6b7ae-f5d4-4e9c-b335-bbc8fcaac1f4"), Name = "Events 35", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T10:30:00Z", EndDate = "2025-04-24T11:00:00Z", Category = "Work" },
    new { Id = Guid.Parse("ccee10c3-577c-4258-a95e-7af4ea05865a"), Name = "Events 36", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T10:45:00Z", EndDate = "2025-04-24T12:15:00Z", Category = "Work" },
    new { Id = Guid.Parse("3dc279f4-10fa-4980-824d-a8a83ff782ef"), Name = "Events 37", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T20:00:00Z", EndDate = "2025-04-24T20:30:00Z", Category = "School" },
    new { Id = Guid.Parse("19d99ffa-64aa-46ac-a2e9-26ab4e806b4c"), Name = "Events 38", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T14:30:00Z", EndDate = "2025-04-24T15:30:00Z", Category = "School" },
    new { Id = Guid.Parse("2495c84d-924b-49cb-896e-b45de43f0cc1"), Name = "Events 39", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T11:00:00Z", EndDate = "2025-04-24T12:30:00Z", Category = "Personal" },
    new { Id = Guid.Parse("12992a7c-6579-470b-ba42-6751eedec071"), Name = "Events 40", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T01:00:00Z", EndDate = "2025-04-24T01:45:00Z", Category = "Personal" },
    new { Id = Guid.Parse("04121348-e111-493f-b37d-68ec65d664a4"), Name = "Events 41", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T16:00:00Z", EndDate = "2025-04-24T16:30:00Z", Category = "School" },
    new { Id = Guid.Parse("fe2558c3-994b-4069-a377-a7bc54cce202"), Name = "Events 42", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T18:00:00Z", EndDate = "2025-04-24T18:45:00Z", Category = "Personal" },
    new { Id = Guid.Parse("df3cb33a-1706-4d3e-a12d-a28778fbf70b"), Name = "Events 43", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T15:15:00Z", EndDate = "2025-04-24T16:15:00Z", Category = "Work" },
    new { Id = Guid.Parse("008f9536-06cf-457c-87b8-1b20589f091d"), Name = "Events 44", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T19:15:00Z", EndDate = "2025-04-24T20:45:00Z", Category = "Work" },
    new { Id = Guid.Parse("c03f0cdc-79f3-499f-a410-27f5789f6276"), Name = "Events 45", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T22:45:00Z", EndDate = "2025-04-24T23:45:00Z", Category = "Work" },
    new { Id = Guid.Parse("48453c30-279d-4c1a-937a-b5d3d9ba3cf2"), Name = "Events 46", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T11:45:00Z", EndDate = "2025-04-24T12:15:00Z", Category = "School" },
    new { Id = Guid.Parse("76810b80-130b-41ec-999f-027f4c90133f"), Name = "Events 47", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T01:15:00Z", EndDate = "2025-04-24T01:45:00Z", Category = "Personal" },
    new { Id = Guid.Parse("9371eb2d-6cf4-4108-819a-26fd3dcf6e6f"), Name = "Events 48", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T17:15:00Z", EndDate = "2025-04-24T18:00:00Z", Category = "School" },
    new { Id = Guid.Parse("6b55643f-2c7c-461e-a6e0-47e6503b4642"), Name = "Events 49", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T05:45:00Z", EndDate = "2025-04-24T07:15:00Z", Category = "Work" },
    new { Id = Guid.Parse("04eab2c2-eaca-4680-88fc-56f474d39f92"), Name = "Events 50", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T20:00:00Z", EndDate = "2025-04-24T20:45:00Z", Category = "Personal" },
    new { Id = Guid.Parse("fc41dabe-8cb1-4ac5-b509-de62d2b14638"), Name = "Events 51", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T22:00:00Z", EndDate = "2025-04-24T22:30:00Z", Category = "School" },
    new { Id = Guid.Parse("73af55b6-3910-44b6-9ee9-c8d2a2c70906"), Name = "Events 52", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T09:30:00Z", EndDate = "2025-04-24T11:00:00Z", Category = "Personal" },
    new { Id = Guid.Parse("fa66cca4-6554-4b12-b05b-2e61d3be1619"), Name = "Events 53", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T02:00:00Z", EndDate = "2025-04-24T03:00:00Z", Category = "School" },
    new { Id = Guid.Parse("5ba1715a-fe04-4645-b73d-8ede38287dc7"), Name = "Events 54", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T10:30:00Z", EndDate = "2025-04-24T12:00:00Z", Category = "Work" },
    new { Id = Guid.Parse("15a41c2f-4425-4041-a3a3-a4223d842879"), Name = "Events 55", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T19:15:00Z", EndDate = "2025-04-24T20:45:00Z", Category = "School" },
    new { Id = Guid.Parse("818e42be-6088-4876-b32b-88621d5dd5ad"), Name = "Events 56", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T00:15:00Z", EndDate = "2025-04-24T00:45:00Z", Category = "School" },
    new { Id = Guid.Parse("99de69f3-2cbe-4118-a615-33cd53374003"), Name = "Events 57", Username = "Mark", Description = "School assignment or lecture.", StartDate = "2025-04-24T00:15:00Z", EndDate = "2025-04-24T01:15:00Z", Category = "School" },
    new { Id = Guid.Parse("eaa95a96-ff3b-4ddb-9954-1fcf511c73a2"), Name = "Events 58", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T13:45:00Z", EndDate = "2025-04-24T15:15:00Z", Category = "Personal" },
    new { Id = Guid.Parse("910e5297-e49b-4397-9e5a-0b932fd7cf1c"), Name = "Events 59", Username = "Mark", Description = "Work-related task or meeting.", StartDate = "2025-04-24T10:15:00Z", EndDate = "2025-04-24T10:45:00Z", Category = "Work" },
    new { Id = Guid.Parse("b6cc736b-1877-452c-95b8-bd193ddf2956"), Name = "Events 60", Username = "Mark", Description = "Personal time or self-care activity.", StartDate = "2025-04-24T16:45:00Z", EndDate = "2025-04-24T17:30:00Z", Category = "Personal" }
};

        data = new Dictionary<Guid, Event>();

        foreach (var item in list)
        {
            var newEvent = new Event
            {
                Id = item.Id,
                Name = item.Name,
                //Username = item.Username,
                Description = item.Description,
                StartDate = DateTime.Parse(item.StartDate, null, DateTimeStyles.RoundtripKind),
                EndDate = DateTime.Parse(item.EndDate, null, DateTimeStyles.RoundtripKind)
            };

            data[newEvent.Id] = newEvent;
        }

    }
}