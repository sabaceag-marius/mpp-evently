using System.Linq.Expressions;
using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Specifications.Events;

//public class EventSpecificationUser(Guid userId) : Specification<Event>
//{
//    public override Expression<Func<Event, bool>> Expr =>
//        (e) => e.UserId == userId;
//}