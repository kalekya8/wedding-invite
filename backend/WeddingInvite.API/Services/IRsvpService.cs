using Microsoft.EntityFrameworkCore;
using WeddingInvite.API.Data;
using WeddingInvite.API.Models;

namespace WeddingInvite.API.Services;

public interface IRsvpService
{
    Task<bool> SubmitRsvpAsync(List<RsvpResponse> responses);
    Task<List<EventRsvpDto>> GetResponsesByEventAsync();
    Task<List<GuestListDto>> GetAllResponsesAsync();
}

public class RsvpService : IRsvpService
{
    private readonly WeddingDbContext _context;

    public RsvpService(WeddingDbContext context)
    {
        _context = context;
    }

    public async Task<bool> SubmitRsvpAsync(List<RsvpResponse> responses)
    {
        foreach (var response in responses)
        {
            response.Id = Guid.NewGuid();
        }

        _context.RsvpResponses.AddRange(responses);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<EventRsvpDto>> GetResponsesByEventAsync()
    {
        var eventNames = new Dictionary<int, string>
        {
            { 1, "Haldi & Mehendi" },
            { 2, "Pellikuthuru" },
            { 3, "Pellikoduku" },
            { 4, "Wedding Ceremony" },
            { 5, "Reception" }
        };

        var responses = await _context.RsvpResponses
            .OrderBy(r => r.EventId)
            .ThenBy(r => r.GuestName)
            .ToListAsync();

        var result = new List<EventRsvpDto>();

        foreach (var eventId in new[] { 1, 2, 3, 4, 5 })
        {
            var eventResponses = responses.Where(r => r.EventId == eventId).ToList();

            var dto = new EventRsvpDto
            {
                EventId = eventId,
                EventName = eventNames[eventId],
                Attendees = eventResponses.Select(r => new GuestDto
                {
                    Name = r.GuestName,
                    Food = r.FoodPreference
                }).ToList(),
                Stats = new StatsDto
                {
                    TotalAttending = eventResponses.Count,
                    Vegetarian = eventResponses.Count(r => r.FoodPreference == "vegetarian"),
                    NonVegetarian = eventResponses.Count(r => r.FoodPreference == "nonVegetarian"),
                    Vegan = eventResponses.Count(r => r.FoodPreference == "vegan")
                }
            };

            result.Add(dto);
        }

        return result;
    }

    public async Task<List<GuestListDto>> GetAllResponsesAsync()
    {
        return await _context.RsvpResponses
            .OrderBy(r => r.EventId)
            .ThenBy(r => r.GuestName)
            .Select(r => new GuestListDto
            {
                GuestName = r.GuestName,
                EventId = r.EventId,
                FoodPreference = r.FoodPreference,
                CreatedAt = r.CreatedAt
            })
            .ToListAsync();
    }
}

public class EventRsvpDto
{
    public int EventId { get; set; }
    public string EventName { get; set; } = string.Empty;
    public List<GuestDto> Attendees { get; set; } = new();
    public StatsDto Stats { get; set; } = new();
}

public class GuestDto
{
    public string Name { get; set; } = string.Empty;
    public string? Food { get; set; }
}

public class StatsDto
{
    public int TotalAttending { get; set; }
    public int Vegetarian { get; set; }
    public int NonVegetarian { get; set; }
    public int Vegan { get; set; }
}

public class GuestListDto
{
    public string GuestName { get; set; } = string.Empty;
    public int EventId { get; set; }
    public string? FoodPreference { get; set; }
    public DateTime CreatedAt { get; set; }
}
