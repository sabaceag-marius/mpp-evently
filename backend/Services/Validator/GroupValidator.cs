using Services.DTOs;
using System.Text.RegularExpressions;

namespace Services.Validator;

public static class GroupValidator
{
    public static ServiceResponse ValidateGroup(GroupCreateRequest request)
    {
        string errorMessage = "";

        if (String.IsNullOrWhiteSpace(request.Name))
            errorMessage += "Name can't be empty!\n";

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