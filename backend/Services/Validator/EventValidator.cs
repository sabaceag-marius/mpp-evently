using Domain.Enums;
using Services.DTOs.Event;

namespace Services.Validator;

public static class EventValidator
{
    public static ServiceResponse ValidateEvent(EventCreateRequest request)
    {
        string errorMessage = "";

        if (String.IsNullOrWhiteSpace(request.Name))
            errorMessage += "Name can't be empty!\n";

        if (request.StartDate >= request.EndDate)
            errorMessage += "End date can't be before the start date!\n";

        //if (String.IsNullOrWhiteSpace(request.CategoryName)
        //    || request.CategoryName.ToCategoryType() == CategoryType.None)

        //    errorMessage += "CategoryDTO name is not valid!\n";

        if(!String.IsNullOrEmpty(errorMessage))
            return new ServiceResponse
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = errorMessage
            };

        return new ServiceResponse();
    }

    public static ServiceResponse ValidateEvent(Guid id, EventUpdateRequest request)
    {
        string errorMessage = "";

        if (request.Id == Guid.Empty || id != request.Id)
            errorMessage += "Id is not valid!\n";

        if (String.IsNullOrWhiteSpace(request.Name))
            errorMessage += "Name can't be empty!\n";

        if (request.StartDate >= request.EndDate)
            errorMessage += "End date can't be before the start date!\n";

        if (!String.IsNullOrEmpty(errorMessage))
            return new ServiceResponse
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = errorMessage
            };

        return new ServiceResponse();
    }
}