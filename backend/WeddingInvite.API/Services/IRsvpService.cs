using Microsoft.EntityFrameworkCore;
using WeddingInvite.API.Data;
using WeddingInvite.API.Models;

namespace WeddingInvite.API.Services;

public interface IRsvpService
{
    Task<(bool Success, string EditToken, string Message)> SubmitRsvpAsync(
        Guid invitationId,
        List<GuestEventResponse> eventResponses,
        string? messageToCouple = null);

    Task<(bool Success, RsvpSubmission? Rsvp, string Message)> GetRsvpByEditTokenAsync(string editToken);

    Task<(bool Success, string Message)> UpdateRsvpAsync(
        string editToken,
        List<GuestEventResponse> eventResponses,
        string? messageToCouple = null);

    Task<List<RsvpSubmission>> GetAllRsvpsAsync();

    Task<(int Attending, int Maybe, int Declined)> GetAttendanceStatsAsync();

    Task<List<GuestListDto>> GetAllGuestResponsesAsync();
}

public class GuestListDto
{
    public string Id { get; set; } = string.Empty;
    public string GuestName { get; set; } = string.Empty;
    public string EventName { get; set; } = string.Empty;
    public string AttendanceStatus { get; set; } = string.Empty;
    public string FoodPreference { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class RsvpService : IRsvpService
{
    private readonly WeddingDbContext _context;

    public RsvpService(WeddingDbContext context)
    {
        _context = context;
    }

    public async Task<(bool Success, string EditToken, string Message)> SubmitRsvpAsync(
        Guid invitationId,
        List<GuestEventResponse> eventResponses,
        string? messageToCouple = null)
    {
        try
        {
            var editToken = GenerateSecureToken();
            var editTokenHash = HashToken(editToken);

            var rsvp = new RsvpSubmission
            {
                Id = Guid.NewGuid(),
                InvitationId = invitationId,
                EditToken = editToken,
                EditTokenHash = editTokenHash,
                MessageToCouple = messageToCouple,
                SubmittedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.RsvpSubmissions.Add(rsvp);
            await _context.SaveChangesAsync();

            // Add event responses in a separate transaction after RSVP is saved
            foreach (var response in eventResponses)
            {
                response.Id = Guid.NewGuid();
                response.UpdatedAt = DateTime.UtcNow;
                _context.GuestEventResponses.Add(response);
            }

            await _context.SaveChangesAsync();

            return (true, editToken, "RSVP submitted successfully.");
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Error submitting RSVP: {ex.Message}", ex);
        }
    }

    public async Task<(bool Success, RsvpSubmission? Rsvp, string Message)> GetRsvpByEditTokenAsync(string editToken)
    {
        var editTokenHash = HashToken(editToken);

        var rsvp = await _context.RsvpSubmissions
            .Include(r => r.EventResponses)
            .FirstOrDefaultAsync(r => r.EditTokenHash == editTokenHash);

        if (rsvp == null)
            return (false, null, "Invalid edit token.");

        return (true, rsvp, "RSVP retrieved successfully.");
    }

    public async Task<(bool Success, string Message)> UpdateRsvpAsync(
        string editToken,
        List<GuestEventResponse> eventResponses,
        string? messageToCouple = null)
    {
        var result = await GetRsvpByEditTokenAsync(editToken);
        if (!result.Success || result.Rsvp == null)
            return (false, "Invalid edit token.");

        result.Rsvp.EventResponses.Clear();
        result.Rsvp.EventResponses = eventResponses;
        result.Rsvp.MessageToCouple = messageToCouple;
        result.Rsvp.UpdatedAt = DateTime.UtcNow;

        _context.RsvpSubmissions.Update(result.Rsvp);
        await _context.SaveChangesAsync();

        return (true, "RSVP updated successfully.");
    }

    public async Task<List<RsvpSubmission>> GetAllRsvpsAsync()
    {
        return await _context.RsvpSubmissions
            .Include(r => r.EventResponses)
            .ToListAsync();
    }

    public async Task<(int Attending, int Maybe, int Declined)> GetAttendanceStatsAsync()
    {
        var responses = await _context.GuestEventResponses.ToListAsync();

        return (
            responses.Count(r => r.AttendanceStatus == (int)Models.AttendanceStatus.Attending),
            responses.Count(r => r.AttendanceStatus == (int)Models.AttendanceStatus.Maybe),
            responses.Count(r => r.AttendanceStatus == (int)Models.AttendanceStatus.Declined)
        );
    }

    public async Task<List<GuestListDto>> GetAllGuestResponsesAsync()
    {
        var responses = await _context.GuestEventResponses
            .Include(r => r.Event)
            .ToListAsync();

        return responses.Select(r => new GuestListDto
        {
            Id = r.Id.ToString(),
            GuestName = r.GuestName,
            EventName = r.Event?.Name ?? "Unknown Event",
            AttendanceStatus = ((Models.AttendanceStatus)r.AttendanceStatus).ToString().ToLower(),
            FoodPreference = r.FoodPreference ?? "Not specified",
            CreatedAt = r.UpdatedAt
        }).ToList();
    }

    private static string GenerateSecureToken()
    {
        return Convert.ToBase64String(System.Security.Cryptography.RandomNumberGenerator.GetBytes(32));
    }

    private static string HashToken(string token)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        return Convert.ToBase64String(sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(token)));
    }
}
