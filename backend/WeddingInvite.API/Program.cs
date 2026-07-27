using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WeddingInvite.API.Auth;
using WeddingInvite.API.Data;
using WeddingInvite.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
var connectionString = builder.Configuration.GetConnectionString("WeddingDatabase")
    ?? throw new InvalidOperationException("Connection string 'WeddingDatabase' not found.");
builder.Services.AddDbContext<WeddingDbContext>(options =>
    options.UseNpgsql(connectionString));

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:SigningKey"]
    ?? throw new InvalidOperationException("JWT signing key not configured");
var key = Encoding.ASCII.GetBytes(jwtKey);

builder.Services.AddAuthentication("Bearer")
    .AddScheme<Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions, JwtAuthenticationHandler>("Bearer", null);

// CORS
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Services
builder.Services.AddScoped<IInvitationService, InvitationService>();
builder.Services.AddScoped<IRsvpService, RsvpService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IVenueService, VenueService>();

var app = builder.Build();

// Apply migrations and seed data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<WeddingDbContext>();
    dbContext.Database.Migrate();

    // Seed sample data if needed
    if (!dbContext.Venues.Any())
    {
        var venue = new WeddingInvite.API.Models.Venue
        {
            Id = Guid.NewGuid(),
            VenueName = "Sample Venue",
            Address = "New Virginia, Iowa",
            GoogleMapsUrl = "https://maps.google.com",
            ParkingDetails = "Free parking available",
            AccessibilityDetails = "Wheelchair accessible",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        dbContext.Venues.Add(venue);
        dbContext.SaveChanges();

        var weddingEvent = new WeddingInvite.API.Models.WeddingEvent
        {
            Id = Guid.NewGuid(),
            Slug = "ceremony",
            Name = "Wedding Ceremony",
            EventDate = DateTime.UtcNow.AddDays(5),
            StartTime = "10:00 AM",
            VenueId = venue.Id,
            DressCode = "Formal Attire",
            Description = "Join us for the wedding ceremony",
            DisplayOrder = 1,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        dbContext.Events.Add(weddingEvent);
        dbContext.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
