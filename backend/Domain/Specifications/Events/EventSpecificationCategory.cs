using Domain.Common.Specifications;
using Domain.Entities;
using System.Linq.Expressions;
using Domain.Enums;

namespace Domain.Specifications.Events;

public class EventSpecificationCategory(string category) : Specification<Event>
{
    public override Expression<Func<Event, bool>> Expr =>
        (e) => e.Category == category.ToCategoryType();
}