using System.Linq.Expressions;
using Domain.Common.Specifications;
using Domain.Entities;
using Domain.Enums;

namespace Domain.Specifications.Events;

public class EventSpecificationCategoryInList(List<string> categoryNames) : Specification<Event>
{
    public override Expression<Func<Event, bool>> Expr => 
        (e) => categoryNames.Contains(CategoryTypeExtensions.ToString(e.Category));
}