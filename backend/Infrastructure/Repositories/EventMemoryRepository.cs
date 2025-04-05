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

    public async Task<Event?> GetByIdAsync(Guid id)
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
            new { Name = "Team Meeting", Username = "Mark", Description = "Weekly team sync-up.", StartDate = "2025-04-01T09:00:00Z", EndDate = "2025-04-01T10:00:00Z", Category = "Work" },
            new { Name = "Project Deadline", Username = "Mark", Description = "Submit final project report.", StartDate = "2025-04-01T15:00:00Z", EndDate = "2025-04-01T17:00:00Z", Category = "School" },
            new { Name = "Workout", Username = "Mark", Description = "Gym session.", StartDate = "2025-04-01T18:00:00Z", EndDate = "2025-04-01T19:30:00Z", Category = "Personal" },
            new { Name = "Client Call", Username = "Mark", Description = "Call with the new client.", StartDate = "2025-04-01T11:00:00Z", EndDate = "2025-04-01T12:00:00Z", Category = "Work" },
            new { Name = "Study Session", Username = "Mark", Description = "Prepare for upcoming exam.", StartDate = "2025-04-01T20:00:00Z", EndDate = "2025-04-01T22:00:00Z", Category = "School" },
            new { Name = "Morning Run", Username = "Mark", Description = "Jogging at the park.", StartDate = "2025-04-02T06:30:00Z", EndDate = "2025-04-02T07:30:00Z", Category = "Personal" },
            new { Name = "Code Review", Username = "Mark", Description = "Review PRs from teammates.", StartDate = "2025-04-02T10:00:00Z", EndDate = "2025-04-02T11:30:00Z", Category = "Work" },
            new { Name = "Lunch with Mentor", Username = "Mark", Description = "Discuss career growth.", StartDate = "2025-04-02T12:30:00Z", EndDate = "2025-04-02T13:30:00Z", Category = "Personal" },
            new { Name = "Research Paper", Username = "Mark", Description = "Work on academic research.", StartDate = "2025-04-02T15:00:00Z", EndDate = "2025-04-02T17:00:00Z", Category = "School" },
            new { Name = "Evening Walk", Username = "Mark", Description = "Relaxing walk outside.", StartDate = "2025-04-02T19:00:00Z", EndDate = "2025-04-02T19:45:00Z", Category = "Personal" },
            new { Name = "Marketing Meeting", Username = "Mark", Description = "Discuss new campaign.", StartDate = "2025-04-03T09:30:00Z", EndDate = "2025-04-03T10:30:00Z", Category = "Work" },
            new { Name = "Library Visit", Username = "Mark", Description = "Find resources for project.", StartDate = "2025-04-03T13:00:00Z", EndDate = "2025-04-03T14:00:00Z", Category = "School" },
            new { Name = "Dinner with Friends", Username = "Mark", Description = "Catch up with old friends.", StartDate = "2025-04-03T19:00:00Z", EndDate = "2025-04-03T21:00:00Z", Category = "Personal" },
            new { Name = "Interview Preparation", Username = "Mark", Description = "Practice for interview.", StartDate = "2025-04-03T15:00:00Z", EndDate = "2025-04-03T16:30:00Z", Category = "Work" },
            new { Name = "Yoga Class", Username = "Mark", Description = "Evening yoga session.", StartDate = "2025-04-03T17:30:00Z", EndDate = "2025-04-03T18:30:00Z", Category = "Personal" },
            new { Name = "Training Session", Username = "Mark", Description = "Online workshop on skills.", StartDate = "2025-04-04T16:00:00Z", EndDate = "2025-04-04T17:30:00Z", Category = "Work" },
            new { Name = "Weekend Planning", Username = "Mark", Description = "Plan upcoming weekend.", StartDate = "2025-04-04T22:00:00Z", EndDate = "2025-04-04T23:00:00Z", Category = "Personal" },
            new { Name = "Team Brainstorming", Username = "Mark", Description = "Discuss new project ideas.", StartDate = "2025-04-07T10:00:00Z", EndDate = "2025-04-07T11:30:00Z", Category = "Work" },
            new { Name = "Essay Writing", Username = "Mark", Description = "Complete assignment draft.", StartDate = "2025-04-08T14:00:00Z", EndDate = "2025-04-08T16:00:00Z", Category = "School" },
            new { Name = "Guitar Practice", Username = "Mark", Description = "Practice new song.", StartDate = "2025-04-09T17:00:00Z", EndDate = "2025-04-09T18:00:00Z", Category = "Personal" },
            new { Name = "Networking Event", Username = "Mark", Description = "Meet industry professionals.", StartDate = "2025-04-10T18:30:00Z", EndDate = "2025-04-10T21:00:00Z", Category = "Work" },
            new { Name = "Meditation Session", Username = "Mark", Description = "Relaxing mindfulness practice.", StartDate = "2025-04-11T07:30:00Z", EndDate = "2025-04-11T08:00:00Z", Category = "Personal" }
        };

        data = new Dictionary<Guid, Event>();

        foreach (var item in list)
        {
            var newEvent = new Event
            {
                Id = Guid.NewGuid(),
                Name = item.Name,
                Username = item.Username,
                Description = item.Description,
                StartDate = DateTime.Parse(item.StartDate, null, DateTimeStyles.RoundtripKind),
                EndDate = DateTime.Parse(item.EndDate, null, DateTimeStyles.RoundtripKind),
                Category = item.Category.ToCategoryType()
            };

            data[newEvent.Id] = newEvent;
        }

    }
}