using Services.DTOs;
using System.Text.RegularExpressions;

namespace Services.Validator;

public static class CategoryValidator
{
    public static ServiceResponse ValidateCategory(CategoryUpdateRequest request)
    {
        string errorMessage = "";

        if(request.Id == Guid.Empty)
            errorMessage += "Id can't be empty!\n";

        if (String.IsNullOrWhiteSpace(request.Name))
            errorMessage += "Name can't be empty!\n";

        if (!Regex.Match(request.Color, "^[0-9a-fA-F]{6}$").Success)
            errorMessage += "Color must be in a hex format!\n";

        if (!String.IsNullOrEmpty(errorMessage))
            return new ServiceResponse
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = errorMessage
            };

        return new ServiceResponse();
    }

    public static ServiceResponse ValidateCategory(CategoryAddRequest request)
    {
        string errorMessage = "";

        if (String.IsNullOrWhiteSpace(request.Name))
            errorMessage += "Name can't be empty!\n";

        if (!Regex.Match(request.Color, "^[0-9a-fA-F]{6}$").Success)
            errorMessage += "Color must be in a hex format!\n";

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