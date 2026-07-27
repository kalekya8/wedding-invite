using Microsoft.EntityFrameworkCore;
using WeddingInvite.API.Data;
using WeddingInvite.API.Models;

namespace WeddingInvite.API.Services;

public interface IVenueService
{
    Task<List<Venue>> GetAllVenuesAsync();
    Task<Venue?> GetVenueByIdAsync(Guid id);
    Task<Venue?> UpdateVenueAsync(Venue venue);
}

public class VenueService : IVenueService
{
    private readonly WeddingDbContext _context;

    public VenueService(WeddingDbContext context)
    {
        _context = context;
    }

    public async Task<List<Venue>> GetAllVenuesAsync()
    {
        return await _context.Venues.ToListAsync();
    }

    public async Task<Venue?> GetVenueByIdAsync(Guid id)
    {
        return await _context.Venues.FindAsync(id);
    }

    public async Task<Venue?> UpdateVenueAsync(Venue venue)
    {
        venue.UpdatedAt = DateTime.UtcNow;
        _context.Venues.Update(venue);
        await _context.SaveChangesAsync();
        return venue;
    }
}
