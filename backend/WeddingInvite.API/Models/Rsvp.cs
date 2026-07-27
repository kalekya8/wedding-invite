namespace WeddingInvite.API.Models;

public enum AttendanceStatus
{
    Attending,
    Maybe,
    Declined
}

public class RsvpSubmission
{
    public Guid Id { get; set; }
    public Guid InvitationId { get; set; }
    public string EditToken { get; set; } = string.Empty;
    public string EditTokenHash { get; set; } = string.Empty;
    public string? MessageToCouple { get; set; }
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Invitation? Invitation { get; set; }
    public ICollection<GuestEventResponse> EventResponses { get; set; } = new List<GuestEventResponse>();
}

public class GuestEventResponse
{
    public Guid Id { get; set; }
    public Guid? InvitedGuestId { get; set; }
    public Guid EventId { get; set; }
    public string GuestName { get; set; } = string.Empty;
    public int AttendanceStatus { get; set; } = (int)Models.AttendanceStatus.Attending;
    public string? FoodPreference { get; set; }
    public string? DietaryRestrictions { get; set; }
    public string? SpecialRequests { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public InvitedGuest? InvitedGuest { get; set; }
    public WeddingEvent? Event { get; set; }
    public RsvpSubmission? RsvpSubmission { get; set; }
}
