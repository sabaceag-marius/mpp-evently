using Domain.Common.Specifications;
using Domain.Entities;
using System.Linq.Expressions;

namespace Domain.Specifications.Events;

public class EventSpecificationGroup(Guid groupId) : Specification<Event>
{
    public override Expression<Func<Event, bool>> Expr =>
        (e) => e.GroupId.Value == groupId;
}