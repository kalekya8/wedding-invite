using Microsoft.AspNetCore.Mvc;
using WeddingInvite.API.Services;

namespace WeddingInvite.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VenuesController : ControllerBase
{
    private readonly IVenueService _venueService;

    public VenuesController(IVenueService venueService)
    {
        _venueService = venueService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllVenues()
    {
        var venues = await _venueService.GetAllVenuesAsync();
        return Ok(new { success = true, venues });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetVenue(Guid id)
    {
        var venue = await _venueService.GetVenueByIdAsync(id);

        if (venue == null)
            return NotFound(new { success = false, message = "Venue not found." });

        return Ok(new { success = true, venue });
    }
}
