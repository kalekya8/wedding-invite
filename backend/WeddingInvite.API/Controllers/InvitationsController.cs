using Microsoft.AspNetCore.Mvc;
using WeddingInvite.API.Models;
using WeddingInvite.API.Services;

namespace WeddingInvite.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvitationsController : ControllerBase
{
    private readonly IInvitationService _invitationService;

    public InvitationsController(IInvitationService invitationService)
    {
        _invitationService = invitationService;
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> GetInvitation(string code)
    {
        var invitation = await _invitationService.GetInvitationByCodeAsync(code);

        if (invitation == null)
            return NotFound(new { success = false, message = "Invitation not found." });

        return Ok(new { success = true, invitation });
    }
}
