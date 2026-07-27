using Microsoft.EntityFrameworkCore;
using WeddingInvite.API.Data;
using WeddingInvite.API.Models;

namespace WeddingInvite.API.Services;

public interface IInvitationService
{
    Task<Invitation?> GetInvitationByCodeAsync(string code);
    Task<Invitation?> CreateInvitationAsync(Invitation invitation, List<InvitedGuest> guests);
    Task<Invitation?> UpdateInvitationAsync(Invitation invitation);
    Task<bool> DeactivateInvitationAsync(Guid id);
}

public class InvitationService : IInvitationService
{
    private readonly WeddingDbContext _context;

    public InvitationService(WeddingDbContext context)
    {
        _context = context;
    }

    public async Task<Invitation?> GetInvitationByCodeAsync(string code)
    {
        return await _context.Invitations
            .Include(i => i.Guests)
            .FirstOrDefaultAsync(i => i.InvitationCode == code && i.IsActive);
    }

    public async Task<Invitation?> CreateInvitationAsync(Invitation invitation, List<InvitedGuest> guests)
    {
        if (string.IsNullOrWhiteSpace(invitation.InvitationCode))
            invitation.InvitationCode = GenerateInvitationCode();

        invitation.Guests = guests;
        _context.Invitations.Add(invitation);
        await _context.SaveChangesAsync();
        return invitation;
    }

    public async Task<Invitation?> UpdateInvitationAsync(Invitation invitation)
    {
        _context.Invitations.Update(invitation);
        await _context.SaveChangesAsync();
        return invitation;
    }

    public async Task<bool> DeactivateInvitationAsync(Guid id)
    {
        var invitation = await _context.Invitations.FindAsync(id);
        if (invitation == null) return false;

        invitation.IsActive = false;
        invitation.UpdatedAt = DateTime.UtcNow;
        _context.Invitations.Update(invitation);
        await _context.SaveChangesAsync();
        return true;
    }

    private static string GenerateInvitationCode()
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var random = new Random();
        return new string(Enumerable.Range(0, 8)
            .Select(_ => chars[random.Next(chars.Length)])
            .ToArray());
    }
}
