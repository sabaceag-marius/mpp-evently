using Domain.Interfaces;
using FluentAssertions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Presentation.Controllers;
using Services.DTOs.Event;
using Services.Interfaces;
using Services.Mapper;
using Services.Services;

namespace Tests;

[TestClass]
public class EventControllerTests
{
    private IEventRepository _eventRepository;
    private IEventService _eventService;
    private EventController _eventController;

    [TestInitialize]
    public void Initialize()
    {
        _eventRepository = new EventMemoryRepository();
        //_eventService = new EventService(_eventRepository);
        _eventController = new EventController(_eventService);
    }

    [TestMethod]
    public async Task Test_GetFilteredEvents()
    {
        var filterRequest = new FilterEventRequest
        {
            //categoryIds = ["work", "school", "personal"],
            StartDate = new DateTime(2025,4,4),
            EndDate = new DateTime(2025,4,4).AddHours(23).AddMinutes(59),
            PageNumber = 1,
            PageSize = 8
        };

        var result = await _eventController.GetFilteredEvents(filterRequest);
        var contentResult = result as OkObjectResult;

        contentResult.Should().NotBe(null);
        contentResult.StatusCode.Should().Be(200);

        var content = contentResult.Value as IEnumerable<EventResponse>;

        content.ToList().Count.Should().Be(2);
    }

    [TestMethod]
    public async Task Test_GetEvent()
    {
        var eventObj = _eventRepository.GetAllDataAsync().Result.First();

        var eventId = eventObj.Id;

        var result = await _eventController.GetEvent(eventId);
        var contentResult = result as OkObjectResult;

        contentResult.Should().NotBe(null);
        contentResult.StatusCode.Should().Be(200);

        contentResult.Value.Should().BeEquivalentTo(eventObj.ToResponse());

        result = await _eventController.GetEvent(Guid.Empty);

        var nokObjectResult = result as ObjectResult;
        nokObjectResult.Should().NotBe(null);
        nokObjectResult.StatusCode.Should().Be(404);

        nokObjectResult.Value.Should().Be("Events was not found");

    }

    [TestMethod]
    public async Task Test_CreateEvent()
    {
        var request = new CreateEventRequest
        {
            Name = "Test",
            Description = "",
            //CategoryName = "school",
            StartDate = new DateTime(2024, 4, 4).AddHours(9),
            EndDate = new DateTime(2024, 4, 4).AddHours(10)
        };

        var result = await _eventController.CreateEvent(request);
        var createdObjectResult = result as CreatedAtActionResult;

        createdObjectResult.Should().NotBe(null);
        createdObjectResult.StatusCode.Should().Be(201);

        createdObjectResult.Value.Should().BeOfType(typeof(EventResponse));

        var eventResponse = createdObjectResult.Value as EventResponse;

        result = await _eventController.GetEvent(eventResponse.Id);
        var contentResult = result as OkObjectResult;

        contentResult.Should().NotBe(null);
        contentResult.StatusCode.Should().Be(200);

        contentResult.Value.Should().BeEquivalentTo(eventResponse);

        request.EndDate = new DateTime(2023, 4, 4).AddHours(10);
        
        result = await _eventController.CreateEvent(request);

        var nokObjectResult = result as ObjectResult;
        nokObjectResult.Should().NotBe(null);
        nokObjectResult.StatusCode.Should().Be(400);
    }

    [TestMethod]
    public async Task Test_DeleteEvent()
    {
        var eventObj = _eventRepository.GetAllDataAsync().Result.First();

        var eventId = eventObj.Id;

        var result = await _eventController.GetEvent(eventId);
        var contentResult = result as OkObjectResult;

        contentResult.Should().NotBe(null);
        contentResult.StatusCode.Should().Be(200);

        contentResult.Value.Should().BeEquivalentTo(eventObj.ToResponse());

        result = await _eventController.DeleteEvent(eventId);
        
        contentResult.Should().NotBe(null);
        contentResult.StatusCode.Should().Be(200);

        contentResult.Value.Should().BeEquivalentTo(eventObj.ToResponse());

        result = await _eventController.DeleteEvent(eventId);

        var nokObjectResult = result as ObjectResult;
        nokObjectResult.Should().NotBe(null);
        nokObjectResult.StatusCode.Should().Be(404);
        
        result = await _eventController.GetEvent(eventId);

        nokObjectResult = result as ObjectResult;
        nokObjectResult.Should().NotBe(null);
        nokObjectResult.StatusCode.Should().Be(404);

        nokObjectResult.Value.Should().Be("Events was not found");
    }

    [TestMethod]
    public async Task Test_UpdateEvent()
    {
        var eventObj = _eventRepository.GetAllDataAsync().Result.First();

        var eventId = eventObj.Id;

        var result = await _eventController.GetEvent(eventId);
        var contentResult = result as OkObjectResult;

        contentResult.Should().NotBe(null);
        contentResult.StatusCode.Should().Be(200);

        contentResult.Value.Should().BeEquivalentTo(eventObj.ToResponse());

        var eventUpdateRequest = new UpdateEventRequest
        {
            Id = Guid.Empty,
            Name = eventObj.Name,
            Description = eventObj.Description,
            StartDate = eventObj.StartDate,
            EndDate = eventObj.EndDate,
            //CategoryName = "school"
        };
        
        result = await _eventController.UpdateEvent(eventId, eventUpdateRequest);
        var nokObjectResult = result as ObjectResult;
        
        nokObjectResult.Should().NotBe(null);
        nokObjectResult.StatusCode.Should().Be(400);
        eventUpdateRequest.Id = eventId;
        result = await _eventController.UpdateEvent(eventId, eventUpdateRequest);
        contentResult = result as OkObjectResult;

        contentResult.Should().NotBe(null);
        contentResult.StatusCode.Should().Be(200);

        contentResult.Value.Should().BeEquivalentTo(eventUpdateRequest.ToEvent().ToResponse());

        result = await _eventController.GetEvent(eventId);
        contentResult = result as OkObjectResult;

        contentResult.Should().NotBe(null);
        contentResult.StatusCode.Should().Be(200);

        contentResult.Value.Should().NotBeEquivalentTo(eventObj.ToResponse());
    }
}