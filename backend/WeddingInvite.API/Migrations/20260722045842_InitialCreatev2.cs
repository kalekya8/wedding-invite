using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeddingInvite.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreatev2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invitations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    InvitationCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    HouseholdName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    PrimaryGuestName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    PrimaryGuestEmail = table.Column<string>(type: "text", nullable: true),
                    PrimaryGuestPhone = table.Column<string>(type: "text", nullable: true),
                    MaximumGuests = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Venues",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    VenueName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Address = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    GoogleMapsUrl = table.Column<string>(type: "text", nullable: false),
                    ParkingDetails = table.Column<string>(type: "text", nullable: false),
                    AccessibilityDetails = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InvitedGuests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    InvitationId = table.Column<Guid>(type: "uuid", nullable: false),
                    FullName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    IsNamedGuest = table.Column<bool>(type: "boolean", nullable: false),
                    IsChild = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvitedGuests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvitedGuests_Invitations_InvitationId",
                        column: x => x.InvitationId,
                        principalTable: "Invitations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RsvpSubmissions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    InvitationId = table.Column<Guid>(type: "uuid", nullable: false),
                    EditToken = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    EditTokenHash = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    MessageToCouple = table.Column<string>(type: "text", nullable: true),
                    SubmittedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RsvpSubmissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RsvpSubmissions_Invitations_InvitationId",
                        column: x => x.InvitationId,
                        principalTable: "Invitations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Slug = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    EventDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    StartTime = table.Column<string>(type: "text", nullable: true),
                    VenueId = table.Column<Guid>(type: "uuid", nullable: false),
                    FoodDetails = table.Column<string>(type: "text", nullable: true),
                    DressCode = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_Venues_VenueId",
                        column: x => x.VenueId,
                        principalTable: "Venues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GuestEventResponses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    InvitedGuestId = table.Column<Guid>(type: "uuid", nullable: true),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false),
                    GuestName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    AttendanceStatus = table.Column<int>(type: "integer", nullable: false),
                    FoodPreference = table.Column<string>(type: "text", nullable: true),
                    DietaryRestrictions = table.Column<string>(type: "text", nullable: true),
                    SpecialRequests = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuestEventResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuestEventResponses_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GuestEventResponses_InvitedGuests_InvitedGuestId",
                        column: x => x.InvitedGuestId,
                        principalTable: "InvitedGuests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_GuestEventResponses_RsvpSubmissions_Id",
                        column: x => x.Id,
                        principalTable: "RsvpSubmissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_VenueId",
                table: "Events",
                column: "VenueId");

            migrationBuilder.CreateIndex(
                name: "IX_GuestEventResponses_EventId",
                table: "GuestEventResponses",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_GuestEventResponses_InvitedGuestId_EventId",
                table: "GuestEventResponses",
                columns: new[] { "InvitedGuestId", "EventId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_InvitationCode",
                table: "Invitations",
                column: "InvitationCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InvitedGuests_InvitationId",
                table: "InvitedGuests",
                column: "InvitationId");

            migrationBuilder.CreateIndex(
                name: "IX_RsvpSubmissions_EditToken",
                table: "RsvpSubmissions",
                column: "EditToken",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RsvpSubmissions_InvitationId",
                table: "RsvpSubmissions",
                column: "InvitationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GuestEventResponses");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "InvitedGuests");

            migrationBuilder.DropTable(
                name: "RsvpSubmissions");

            migrationBuilder.DropTable(
                name: "Venues");

            migrationBuilder.DropTable(
                name: "Invitations");
        }
    }
}
