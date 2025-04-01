namespace Services;

public class Response
{
    public bool IsError { get; set; }
    public string? ErrorMessage { get; set; }
    public ErrorStatusCodes ErrorStatusCode { get; set; }
}
public class Response<T> : Response
{
    public T? Value { get; set; }
}

public enum ErrorStatusCodes
{
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    InternalServerError,
}

public static class ErrorStatusCodeExtension
{
    public static int ToStatusCode(this ErrorStatusCodes errorStatusCode)
    {
        switch (errorStatusCode)
        {
            default:
                return 500;

            case ErrorStatusCodes.BadRequest:
                return 400;

            case ErrorStatusCodes.Unauthorized:
                return 401;

            case ErrorStatusCodes.Forbidden:
                return 403;

            case ErrorStatusCodes.NotFound:
                return 404;

            case ErrorStatusCodes.InternalServerError:
                return 500;
        }
    }
}