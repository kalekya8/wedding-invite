using Microsoft.AspNetCore.Mvc;
using WeddingInvite.API.Models;
using WeddingInvite.API.Services;

namespace WeddingInvite.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RsvpsController : ControllerBase
{
    private readonly IRsvpService _rsvpService;

    public RsvpsController(IRsvpService rsvpService)
    {
        _rsvpService = rsvpService;
    }

    [HttpPost]
    public async Task<IActionResult> SubmitRsvp([FromBody] SubmitRsvpRequest request)
    {
        if (request?.EventResponses == null || request.EventResponses.Count == 0)
            return BadRequest(new { success = false, message = "Event responses are required." });

        try
        {
            var responses = request.EventResponses.Select(dto => new RsvpResponse
            {
                EventId = int.Parse(dto.EventId),
                GuestName = dto.GuestName,
                FoodPreference = dto.FoodPreference
            }).ToList();

            await _rsvpService.SubmitRsvpAsync(responses);
            return Ok(new { success = true, message = "RSVP submitted successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = $"Error: {ex.Message}" });
        }
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetGuestList()
    {
        var events = await _rsvpService.GetResponsesByEventAsync();
        return Ok(new { success = true, events });
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllResponses()
    {
        var responses = await _rsvpService.GetAllResponsesAsync();
        return Ok(new { success = true, responses });
    }
}

public class SubmitRsvpRequest
{
    public List<GuestEventResponseDto> EventResponses { get; set; } = new();
}

public class GuestEventResponseDto
{
    public string EventId { get; set; } = string.Empty;
    public string GuestName { get; set; } = string.Empty;
    public string? FoodPreference { get; set; }
}
