using System.Linq.Expressions;

namespace Domain.Common.Specifications;

public abstract class Specification<TEntity>
{
    public abstract Expression<Func<TEntity, bool>> Expr { get; }

}