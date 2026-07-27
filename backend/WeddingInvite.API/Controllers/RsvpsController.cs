using Microsoft.AspNetCore.Mvc;
using WeddingInvite.API.Models;
using WeddingInvite.API.Services;

namespace WeddingInvite.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RsvpsController : ControllerBase
{
    private readonly IRsvpService _rsvpService;
    private readonly IInvitationService _invitationService;

    public RsvpsController(IRsvpService rsvpService, IInvitationService invitationService)
    {
        _rsvpService = rsvpService;
        _invitationService = invitationService;
    }

    [HttpPost]
    public async Task<IActionResult> SubmitRsvp([FromBody] SubmitRsvpRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.InvitationCode))
            return BadRequest(new { success = false, message = "Invitation code is required." });

        var invitation = await _invitationService.GetInvitationByCodeAsync(request.InvitationCode);
        if (invitation == null)
            return NotFound(new { success = false, message = "Invitation not found." });

        var eventResponses = request.EventResponses.ConvertAll(dto => new GuestEventResponse
        {
            EventId = Guid.Parse(dto.EventId),
            InvitedGuestId = dto.GuestId != null ? Guid.Parse(dto.GuestId) : null,
            GuestName = dto.GuestName,
            AttendanceStatus = (int)Enum.Parse<AttendanceStatus>(dto.AttendanceStatus, ignoreCase: true),
            FoodPreference = dto.FoodPreference,
            DietaryRestrictions = dto.DietaryRestrictions,
            SpecialRequests = dto.SpecialRequests
        });

        var (success, editToken, message) = await _rsvpService.SubmitRsvpAsync(
            invitation.Id,
            eventResponses,
            request.MessageToCouple);

        return Ok(new { success, editToken, message });
    }

    [HttpGet("manage/{editToken}")]
    public async Task<IActionResult> GetRsvp(string editToken)
    {
        var (success, rsvp, message) = await _rsvpService.GetRsvpByEditTokenAsync(editToken);

        if (!success)
            return Unauthorized(new { success, message });

        return Ok(new { success, rsvp, message });
    }

    [HttpPut("manage/{editToken}")]
    public async Task<IActionResult> UpdateRsvp(string editToken, [FromBody] UpdateRsvpRequest request)
    {
        var eventResponses = request.EventResponses.ConvertAll(dto => new GuestEventResponse
        {
            EventId = Guid.Parse(dto.EventId),
            InvitedGuestId = dto.GuestId != null ? Guid.Parse(dto.GuestId) : null,
            GuestName = dto.GuestName,
            AttendanceStatus = (int)Enum.Parse<AttendanceStatus>(dto.AttendanceStatus, ignoreCase: true),
            FoodPreference = dto.FoodPreference,
            DietaryRestrictions = dto.DietaryRestrictions,
            SpecialRequests = dto.SpecialRequests
        });

        var (success, message) = await _rsvpService.UpdateRsvpAsync(
            editToken,
            eventResponses,
            request.MessageToCouple);

        if (!success)
            return Unauthorized(new { success, message });

        return Ok(new { success, message });
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetGuestList()
    {
        var guestResponses = await _rsvpService.GetAllGuestResponsesAsync();
        return Ok(guestResponses);
    }
}

public class SubmitRsvpRequest
{
    public string InvitationCode { get; set; } = string.Empty;
    public List<GuestEventResponseDto> EventResponses { get; set; } = new();
    public string? MessageToCouple { get; set; }
}

public class UpdateRsvpRequest
{
    public List<GuestEventResponseDto> EventResponses { get; set; } = new();
    public string? MessageToCouple { get; set; }
}

public class GuestEventResponseDto
{
    public string EventId { get; set; } = string.Empty;
    public string? GuestId { get; set; }
    public string GuestName { get; set; } = string.Empty;
    public string AttendanceStatus { get; set; } = "attending";
    public string? FoodPreference { get; set; }
    public string? DietaryRestrictions { get; set; }
    public string? SpecialRequests { get; set; }
}
