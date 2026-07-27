namespace WeddingInvite.API.Models;

public class Invitation
{
    public Guid Id { get; set; }
    public string InvitationCode { get; set; } = string.Empty;
    public string HouseholdName { get; set; } = string.Empty;
    public string PrimaryGuestName { get; set; } = string.Empty;
    public string? PrimaryGuestEmail { get; set; }
    public string? PrimaryGuestPhone { get; set; }
    public int MaximumGuests { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<InvitedGuest> Guests { get; set; } = new List<InvitedGuest>();
    public ICollection<RsvpSubmission> RsvpSubmissions { get; set; } = new List<RsvpSubmission>();
}

public class InvitedGuest
{
    public Guid Id { get; set; }
    public Guid InvitationId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public bool IsNamedGuest { get; set; }
    public bool IsChild { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Invitation? Invitation { get; set; }
    public ICollection<GuestEventResponse> EventResponses { get; set; } = new List<GuestEventResponse>();
}
