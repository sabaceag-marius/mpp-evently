using System.Linq.Expressions;

namespace Domain.Common.Specifications;

public class AnySpecification<TEntity> : Specification<TEntity>
{
    public override Expression<Func<TEntity, bool>> Expr
        => entity => true;
}