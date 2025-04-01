using System.Linq.Expressions;
using Domain.Common.Specifications;
using Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Domain.Specifications.Events;

public class EventSpecificationStartDate(DateTime date) : Specification<Event>
{
    public override Expression<Func<Event, bool>> Expr => (e) => e.StartDate >= date;
}