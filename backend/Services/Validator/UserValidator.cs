using Services.DTOs;

namespace Services.Validator;

public static class UserValidator
{
    public static ServiceResponse ValidateRegisterRequest(this UserRegisterRequest registerRequest)
    {
        string errorMessage = "";

        if (String.IsNullOrWhiteSpace(registerRequest.UserName))
            errorMessage += "Name can't be empty!\n";

        if(registerRequest.Password != registerRequest.ConfirmPassword)
            errorMessage += "Passwords do not match!\n";

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