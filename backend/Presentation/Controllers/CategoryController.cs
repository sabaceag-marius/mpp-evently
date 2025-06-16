using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.DTOs.Event;
using Services.Interfaces;
using Services.Validator;
using System.Security.Claims;
using Services.DTOs;
using System.ComponentModel.DataAnnotations;

namespace Presentation.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IUserService _userService;

        public CategoryController(ICategoryService categoryService, IUserService userService)
        {
            _categoryService = categoryService;
            _userService = userService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllCategories()
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .Aggregate("", (current, next) => current + "\n" + next);
                return new ObjectResult(new { errorMessage = errorMessage })
                {
                    StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
                };
            }

            var response = await _categoryService.GetAllCategories();

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return Ok(response.Value);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserCategories()
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .Aggregate("", (current, next) => current + "\n" + next);
                return new ObjectResult(new { errorMessage = errorMessage })
                {
                    StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
                };
            }

            var username = User.FindFirstValue(ClaimTypes.GivenName);

            var userResponse = await _userService.GetUserByNameAsync(username);

            // This shouldn't happen since we have the 'Authorize' attribute
            if (userResponse.IsError)
            {
                return new ObjectResult(userResponse.ErrorMessage)
                {
                    StatusCode = userResponse.ErrorStatusCode.ToStatusCode()
                };
            }

            var user = userResponse.Value;

            var response = await _categoryService.GetUserCategories(user.Id);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return Ok(response.Value);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory( AddCategoryRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .Aggregate("", (current, next) => current + "\n" + next);
                return new ObjectResult(new { errorMessage = errorMessage })
                {
                    StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
                };
            }

            var validateResponse = CategoryValidator.ValidateCategory(request);

            if (validateResponse.IsError)
            {
                return new ObjectResult(validateResponse.ErrorMessage)
                {
                    StatusCode = validateResponse.ErrorStatusCode.ToStatusCode()
                };
            }

            var username = User.FindFirstValue(ClaimTypes.GivenName);

            var userResponse = await _userService.GetUserByNameAsync(username);

            // This shouldn't happen since we have the 'Authorize' attribute
            if (userResponse.IsError)
            {
                return new ObjectResult(userResponse.ErrorMessage)
                {
                    StatusCode = userResponse.ErrorStatusCode.ToStatusCode()
                };
            }

            var user = userResponse.Value;

            var response = await _categoryService.CreateCategory(request, user);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return Ok(response.Value);
        }

        [HttpPut("range")]
        public async Task<IActionResult> UpdateUserCategories(IEnumerable<UpdateCategoryRequest> requests)
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .Aggregate("", (current, next) => current + "\n" + next);
                return new ObjectResult(new { errorMessage = errorMessage })
                {
                    StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
                };
            }

            foreach (var request in requests)
            {
                var validateResponse = CategoryValidator.ValidateCategory(request);

                if (validateResponse.IsError)
                {
                    return new ObjectResult(validateResponse.ErrorMessage)
                    {
                        StatusCode = validateResponse.ErrorStatusCode.ToStatusCode()
                    };
                }
            }

            var username = User.FindFirstValue(ClaimTypes.GivenName);

            var userResponse = await _userService.GetUserByNameAsync(username);

            // This shouldn't happen since we have the 'Authorize' attribute
            if (userResponse.IsError)
            {
                return new ObjectResult(userResponse.ErrorMessage)
                {
                    StatusCode = userResponse.ErrorStatusCode.ToStatusCode()
                };
            }

            var user = userResponse.Value;

            var response = await _categoryService.UpdateUserCategories(requests, user);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return Ok();
        }
    }
}
