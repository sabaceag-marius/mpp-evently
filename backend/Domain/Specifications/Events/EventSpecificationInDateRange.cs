using System.Linq.Expressions;
using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Specifications.Events;

public class EventSpecificationInDateRange(DateTime startDate, DateTime endDate) : Specification<Event>
{
    public override Expression<Func<Event, bool>> Expr => (e) => e.StartDate <= endDate && e.EndDate >= startDate;
}