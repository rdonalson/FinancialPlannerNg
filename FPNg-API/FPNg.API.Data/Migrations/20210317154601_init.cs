using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace FPNg.API.Data.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "ItemDetail");

            migrationBuilder.CreateTable(
                name: "InitialAmount",
                schema: "ItemDetail",
                columns: table => new
                {
                    PkInitialAmount = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(maxLength: 75, nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: true),
                    BeginDate = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitialAmount", x => x.PkInitialAmount);
                });

            migrationBuilder.CreateTable(
                name: "Periods",
                schema: "ItemDetail",
                columns: table => new
                {
                    PkPeriod = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 75, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Periods", x => x.PkPeriod);
                });

            migrationBuilder.CreateTable(
                name: "Credits",
                schema: "ItemDetail",
                columns: table => new
                {
                    PkCredit = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(maxLength: 75, nullable: false),
                    Name = table.Column<string>(maxLength: 75, nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: true),
                    FkPeriod = table.Column<int>(nullable: true),
                    BeginDate = table.Column<DateTime>(type: "date", nullable: true),
                    EndDate = table.Column<DateTime>(type: "date", nullable: true),
                    WeeklyDOW = table.Column<int>(nullable: true),
                    EverOtherWeekDOW = table.Column<int>(nullable: true),
                    BiMonthlyDay1 = table.Column<int>(nullable: true),
                    BiMonthlyDay2 = table.Column<int>(nullable: true),
                    MonthlyDOM = table.Column<int>(nullable: true),
                    Quarterly1Month = table.Column<int>(nullable: true),
                    Quarterly1Day = table.Column<int>(nullable: true),
                    Quarterly2Month = table.Column<int>(nullable: true),
                    Quarterly2Day = table.Column<int>(nullable: true),
                    Quarterly3Month = table.Column<int>(nullable: true),
                    Quarterly3Day = table.Column<int>(nullable: true),
                    Quarterly4Month = table.Column<int>(nullable: true),
                    Quarterly4Day = table.Column<int>(nullable: true),
                    SemiAnnual1Month = table.Column<int>(nullable: true),
                    SemiAnnual1Day = table.Column<int>(nullable: true),
                    SemiAnnual2Month = table.Column<int>(nullable: true),
                    SemiAnnual2Day = table.Column<int>(nullable: true),
                    AnnualMOY = table.Column<int>(nullable: true),
                    AnnualDOM = table.Column<int>(nullable: true),
                    DateRangeReq = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Credits", x => x.PkCredit);
                    table.ForeignKey(
                        name: "FK_Credits_Periods",
                        column: x => x.FkPeriod,
                        principalSchema: "ItemDetail",
                        principalTable: "Periods",
                        principalColumn: "PkPeriod",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Debits",
                schema: "ItemDetail",
                columns: table => new
                {
                    PkDebit = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(maxLength: 75, nullable: false),
                    Name = table.Column<string>(maxLength: 75, nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: true),
                    FkPeriod = table.Column<int>(nullable: true),
                    BeginDate = table.Column<DateTime>(type: "date", nullable: true),
                    EndDate = table.Column<DateTime>(type: "date", nullable: true),
                    WeeklyDOW = table.Column<int>(nullable: true),
                    EverOtherWeekDOW = table.Column<int>(nullable: true),
                    BiMonthlyDay1 = table.Column<int>(nullable: true),
                    BiMonthlyDay2 = table.Column<int>(nullable: true),
                    MonthlyDOM = table.Column<int>(nullable: true),
                    Quarterly1Month = table.Column<int>(nullable: true),
                    Quarterly1Day = table.Column<int>(nullable: true),
                    Quarterly2Month = table.Column<int>(nullable: true),
                    Quarterly2Day = table.Column<int>(nullable: true),
                    Quarterly3Month = table.Column<int>(nullable: true),
                    Quarterly3Day = table.Column<int>(nullable: true),
                    Quarterly4Month = table.Column<int>(nullable: true),
                    Quarterly4Day = table.Column<int>(nullable: true),
                    SemiAnnual1Month = table.Column<int>(nullable: true),
                    SemiAnnual1Day = table.Column<int>(nullable: true),
                    SemiAnnual2Month = table.Column<int>(nullable: true),
                    SemiAnnual2Day = table.Column<int>(nullable: true),
                    AnnualMOY = table.Column<int>(nullable: true),
                    AnnualDOM = table.Column<int>(nullable: true),
                    DateRangeReq = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Debits", x => x.PkDebit);
                    table.ForeignKey(
                        name: "FK_Debits_Periods",
                        column: x => x.FkPeriod,
                        principalSchema: "ItemDetail",
                        principalTable: "Periods",
                        principalColumn: "PkPeriod",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Credits_FkPeriod",
                schema: "ItemDetail",
                table: "Credits",
                column: "FkPeriod");

            migrationBuilder.CreateIndex(
                name: "IX_Debits_FkPeriod",
                schema: "ItemDetail",
                table: "Debits",
                column: "FkPeriod");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Credits",
                schema: "ItemDetail");

            migrationBuilder.DropTable(
                name: "Debits",
                schema: "ItemDetail");

            migrationBuilder.DropTable(
                name: "InitialAmount",
                schema: "ItemDetail");

            migrationBuilder.DropTable(
                name: "Periods",
                schema: "ItemDetail");
        }
    }
}
