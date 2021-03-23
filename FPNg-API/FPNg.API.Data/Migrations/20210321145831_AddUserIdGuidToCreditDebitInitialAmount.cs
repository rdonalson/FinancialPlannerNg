using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FPNg.API.Data.Migrations
{
    public partial class AddUserIdGuidToCreditDebitInitialAmount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                schema: "ItemDetail",
                table: "InitialAmount",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                schema: "ItemDetail",
                table: "Debits",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                schema: "ItemDetail",
                table: "Credits",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "ItemDetail",
                table: "InitialAmount");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "ItemDetail",
                table: "Debits");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "ItemDetail",
                table: "Credits");
        }
    }
}
