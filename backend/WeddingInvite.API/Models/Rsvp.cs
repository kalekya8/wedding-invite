namespace WeddingInvite.API.Models;

public class RsvpResponse
{
    public Guid Id { get; set; }
    public int EventId { get; set; }
    public string GuestName { get; set; } = string.Empty;
    public string? FoodPreference { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
