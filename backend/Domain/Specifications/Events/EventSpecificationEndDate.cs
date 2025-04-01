using System.Linq.Expressions;
using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Specifications.Events;

public class EventSpecificationEndDate(DateTime date) : Specification<Event>
{
    public override Expression<Func<Event, bool>> Expr => (e) => e.StartDate <= date;
}