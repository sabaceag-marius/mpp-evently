using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.DTOs.Event;
using Services.Interfaces;
using Services.Validator;

namespace Presentation.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
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

    }
}
