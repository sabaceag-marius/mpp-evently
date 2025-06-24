namespace Domain.Interfaces;

public interface IRepository<T>
{
    public Task<IEnumerable<T>> GetAllDataAsync();

    public Task<T> GetByIdAsync(Guid id);

    public Task<T?> GetByIdNoTracking(Guid id);

    public T? Add(T t);

    public Task<T?> UpdateAsync(T t);

    public Task DeleteAsync(T t);

}