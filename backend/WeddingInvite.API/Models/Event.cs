namespace WeddingInvite.API.Models;

public class WeddingEvent
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public DateTime EventDate { get; set; }
    public string? StartTime { get; set; }
    public Guid VenueId { get; set; }
    public string? FoodDetails { get; set; }
    public string DressCode { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Venue? Venue { get; set; }
    public ICollection<GuestEventResponse> GuestResponses { get; set; } = new List<GuestEventResponse>();
}

public class Venue
{
    public Guid Id { get; set; }
    public string VenueName { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string GoogleMapsUrl { get; set; } = string.Empty;
    public string ParkingDetails { get; set; } = string.Empty;
    public string? AccessibilityDetails { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<WeddingEvent> Events { get; set; } = new List<WeddingEvent>();
}
