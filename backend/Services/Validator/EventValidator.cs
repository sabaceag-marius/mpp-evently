using Domain.Enums;
using Services.DTOs.Event;

namespace Services.Validator;

public static class EventValidator
{
    public static Response ValidateEvent(CreateEventRequest eventRequest)
    {
        string errorMessage = "";

        if (String.IsNullOrWhiteSpace(eventRequest.Name))
            errorMessage += "Name can't be empty!\n";

        if (eventRequest.StartDate >= eventRequest.EndDate)
            errorMessage += "End date can't be before the start date!\n";

        //if (String.IsNullOrWhiteSpace(eventRequest.CategoryName)
        //    || eventRequest.CategoryName.ToCategoryType() == CategoryType.None)

        //    errorMessage += "Category name is not valid!\n";

        if(!String.IsNullOrEmpty(errorMessage))
            return new Response
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = errorMessage
            };

        return new Response();
    }

    public static Response ValidateEvent(Guid id, UpdateEventRequest eventRequest)
    {
        string errorMessage = "";

        if (eventRequest.Id == Guid.Empty || id != eventRequest.Id)
            errorMessage += "Id is not valid!\n";

        if (String.IsNullOrWhiteSpace(eventRequest.Name))
            errorMessage += "Name can't be empty!\n";

        if (eventRequest.StartDate >= eventRequest.EndDate)
            errorMessage += "End date can't be before the start date!\n";

        if (!String.IsNullOrEmpty(errorMessage))
            return new Response
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = errorMessage
            };

        return new Response();
    }
}