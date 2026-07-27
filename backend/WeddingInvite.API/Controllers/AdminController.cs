using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeddingInvite.API.Data;
using WeddingInvite.API.Models;

namespace WeddingInvite.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly WeddingDbContext _dbContext;

    public AdminController(WeddingDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost("seed-data")]
    public async Task<IActionResult> SeedData()
    {
        try
        {
            // Clear existing data using direct SQL to avoid cascade issues
            await _dbContext.Database.ExecuteSqlRawAsync("DELETE FROM \"GuestEventResponses\"");
            await _dbContext.Database.ExecuteSqlRawAsync("DELETE FROM \"Events\"");
            await _dbContext.Database.ExecuteSqlRawAsync("DELETE FROM \"Venues\"");

            // Create venue
            var venue = new Venue
            {
                Id = Guid.NewGuid(),
                VenueName = "Lohitha & Vivian's Wedding Venue",
                Address = "Wedding Location",
                GoogleMapsUrl = "https://maps.google.com",
                ParkingDetails = "Parking available",
                AccessibilityDetails = "Accessible",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _dbContext.Venues.Add(venue);
            await _dbContext.SaveChangesAsync();

            // Create events
            var events = new List<WeddingInvite.API.Models.WeddingEvent>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Slug = "haldi-mehendi",
                    Name = "Haldi & Mehendi",
                    EventDate = new DateTime(2026, 8, 25, 0, 0, 0, DateTimeKind.Utc),
                    StartTime = "Evening",
                    VenueId = venue.Id,
                    DressCode = "Traditional - Yellow",
                    Description = "Join us for Haldi and Mehendi celebrations",
                    DisplayOrder = 1,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Slug = "pellikuthuru",
                    Name = "Pellikuthuru",
                    EventDate = new DateTime(2026, 8, 26, 0, 0, 0, DateTimeKind.Utc),
                    StartTime = "Evening",
                    VenueId = venue.Id,
                    DressCode = "Traditional",
                    Description = "Pellikuthuru ceremony",
                    DisplayOrder = 2,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Slug = "pellikoduku",
                    Name = "Pellikoduku",
                    EventDate = new DateTime(2026, 8, 26, 0, 0, 0, DateTimeKind.Utc),
                    StartTime = "Evening",
                    VenueId = venue.Id,
                    DressCode = "Traditional",
                    Description = "Pellikoduku ceremony",
                    DisplayOrder = 3,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Slug = "wedding-ceremony",
                    Name = "Wedding Ceremony",
                    EventDate = new DateTime(2026, 8, 27, 0, 0, 0, DateTimeKind.Utc),
                    StartTime = "Morning",
                    VenueId = venue.Id,
                    DressCode = "Traditional",
                    Description = "Wedding ceremony",
                    DisplayOrder = 4,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Slug = "reception",
                    Name = "Reception",
                    EventDate = new DateTime(2026, 8, 27, 0, 0, 0, DateTimeKind.Utc),
                    StartTime = "Evening",
                    VenueId = venue.Id,
                    DressCode = "Traditional",
                    Description = "Reception celebration",
                    DisplayOrder = 5,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            };

            _dbContext.Events.AddRange(events);
            await _dbContext.SaveChangesAsync();

            return Ok(new { success = true, message = "Database seeded successfully with events and venue" });
        }
        catch (Exception ex)
        {
            var message = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, new { success = false, message = $"Error: {message}" });
        }
    }

    [HttpPost("create-invitation")]
    public async Task<IActionResult> CreateInvitation([FromBody] CreateInvitationRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.InvitationCode) || string.IsNullOrWhiteSpace(request.HouseholdName))
            {
                return BadRequest(new { success = false, message = "InvitationCode and HouseholdName are required" });
            }

            // Check if invitation already exists
            var existingInvitation = _dbContext.Invitations
                .FirstOrDefault(i => i.InvitationCode == request.InvitationCode);

            if (existingInvitation != null)
            {
                return BadRequest(new { success = false, message = "Invitation code already exists" });
            }

            var invitation = new Invitation
            {
                Id = Guid.NewGuid(),
                InvitationCode = request.InvitationCode,
                HouseholdName = request.HouseholdName,
                PrimaryGuestName = request.PrimaryGuestName ?? "Guest",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _dbContext.Invitations.Add(invitation);
            await _dbContext.SaveChangesAsync();

            return Ok(new { success = true, message = $"Invitation '{request.InvitationCode}' created successfully", invitationId = invitation.Id });
        }
        catch (Exception ex)
        {
            var message = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, new { success = false, message = $"Error: {message}" });
        }
    }
}

public class CreateInvitationRequest
{
    public string InvitationCode { get; set; } = string.Empty;
    public string HouseholdName { get; set; } = string.Empty;
    public string? PrimaryGuestName { get; set; }
}
