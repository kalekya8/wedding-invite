using Microsoft.EntityFrameworkCore;
using WeddingInvite.API.Models;

namespace WeddingInvite.API.Data;

public class WeddingDbContext : DbContext
{
    public WeddingDbContext(DbContextOptions<WeddingDbContext> options) : base(options)
    {
    }

    public DbSet<Invitation> Invitations => Set<Invitation>();
    public DbSet<InvitedGuest> InvitedGuests => Set<InvitedGuest>();
    public DbSet<WeddingEvent> Events => Set<WeddingEvent>();
    public DbSet<Venue> Venues => Set<Venue>();
    public DbSet<RsvpSubmission> RsvpSubmissions => Set<RsvpSubmission>();
    public DbSet<GuestEventResponse> GuestEventResponses => Set<GuestEventResponse>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Invitation
        modelBuilder.Entity<Invitation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.InvitationCode).IsRequired().HasMaxLength(50);
            entity.HasIndex(e => e.InvitationCode).IsUnique();
            entity.Property(e => e.HouseholdName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.PrimaryGuestName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasMany(e => e.Guests)
                .WithOne(g => g.Invitation)
                .HasForeignKey(g => g.InvitationId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasMany(e => e.RsvpSubmissions)
                .WithOne(r => r.Invitation)
                .HasForeignKey(r => r.InvitationId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // InvitedGuest
        modelBuilder.Entity<InvitedGuest>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FullName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // Venue
        modelBuilder.Entity<Venue>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.VenueName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Address).IsRequired().HasMaxLength(500);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // WeddingEvent
        modelBuilder.Entity<WeddingEvent>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Slug).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.DressCode).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(1000);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasOne(e => e.Venue)
                .WithMany(v => v.Events)
                .HasForeignKey(e => e.VenueId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(e => e.GuestResponses)
                .WithOne(g => g.Event)
                .HasForeignKey(g => g.EventId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // RsvpSubmission
        modelBuilder.Entity<RsvpSubmission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.EditToken).IsRequired().HasMaxLength(200);
            entity.Property(e => e.EditTokenHash).IsRequired().HasMaxLength(200);
            entity.HasIndex(e => e.EditToken).IsUnique();
            entity.Property(e => e.SubmittedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasMany(e => e.EventResponses)
                .WithOne(g => g.RsvpSubmission)
                .HasForeignKey(g => g.Id)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // GuestEventResponse
        modelBuilder.Entity<GuestEventResponse>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.GuestName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasOne(e => e.InvitedGuest)
                .WithMany(g => g.EventResponses)
                .HasForeignKey(e => e.InvitedGuestId)
                .OnDelete(DeleteBehavior.SetNull);
            entity.HasIndex(e => new { e.InvitedGuestId, e.EventId }).IsUnique();
        });
    }
}
