using Microsoft.EntityFrameworkCore;
using WeddingInvite.API.Data;
using WeddingInvite.API.Models;

namespace WeddingInvite.API.Services;

public interface IEventService
{
    Task<List<WeddingEvent>> GetAllEventsAsync();
    Task<WeddingEvent?> GetEventBySlugAsync(string slug);
    Task<WeddingEvent?> UpdateEventAsync(WeddingEvent weddingEvent);
}

public class EventService : IEventService
{
    private readonly WeddingDbContext _context;

    public EventService(WeddingDbContext context)
    {
        _context = context;
    }

    public async Task<List<WeddingEvent>> GetAllEventsAsync()
    {
        return await _context.Events
            .Where(e => e.IsActive)
            .Include(e => e.Venue)
            .OrderBy(e => e.DisplayOrder)
            .ToListAsync();
    }

    public async Task<WeddingEvent?> GetEventBySlugAsync(string slug)
    {
        return await _context.Events
            .Include(e => e.Venue)
            .FirstOrDefaultAsync(e => e.Slug == slug && e.IsActive);
    }

    public async Task<WeddingEvent?> UpdateEventAsync(WeddingEvent weddingEvent)
    {
        weddingEvent.UpdatedAt = DateTime.UtcNow;
        _context.Events.Update(weddingEvent);
        await _context.SaveChangesAsync();
        return weddingEvent;
    }
}
