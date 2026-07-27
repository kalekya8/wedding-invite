using Microsoft.AspNetCore.Mvc;
using WeddingInvite.API.Services;

namespace WeddingInvite.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventsController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEvents()
    {
        var events = await _eventService.GetAllEventsAsync();
        return Ok(new { success = true, events });
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetEventBySlug(string slug)
    {
        var weddingEvent = await _eventService.GetEventBySlugAsync(slug);

        if (weddingEvent == null)
            return NotFound(new { success = false, message = "Event not found." });

        return Ok(new { success = true, weddingEvent });
    }
}
