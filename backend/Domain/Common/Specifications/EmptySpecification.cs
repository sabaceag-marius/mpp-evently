using System.Linq.Expressions;

namespace Domain.Common.Specifications;

public sealed class EmptySpecification<TEntity> : Specification<TEntity>
{
    public EmptySpecification(Expression<Func<TEntity,bool>> expr)
    {
        Expr = expr;
    }

    public override Expression<Func<TEntity, bool>> Expr { get; }
}