using Microsoft.EntityFrameworkCore.Migrations;

namespace FPNg.API.Data.Migrations
{
    public partial class AddUserIdGuidToVwCreditVwDebit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER VIEW [ItemDetail].[vwCredits]
                AS
                    SELECT c.PkCredit, 
						c.UserId,
                        c.UserName, 
                        c.Name, 
                        c.Amount, 
                        c.FkPeriod, 
                        p.Name AS PeriodName, 
                        c.BeginDate, 
                        c.EndDate, 
                        c.WeeklyDOW, 
                        c.EverOtherWeekDOW, 
                        c.BiMonthlyDay1, 
                        c.BiMonthlyDay2, 
                        c.MonthlyDOM, 
                        c.Quarterly1Month, 
                        c.Quarterly1Day, 
                        c.Quarterly2Month, 
                        c.Quarterly2Day, 
                        c.Quarterly3Month, 
                        c.Quarterly3Day, 
                        c.Quarterly4Month, 
                        c.Quarterly4Day, 
                        c.SemiAnnual1Month, 
                        c.SemiAnnual1Day, 
                        c.SemiAnnual2Month, 
                        c.SemiAnnual2Day, 
                        c.AnnualMOY, 
                        c.AnnualDOM, 
                        c.DateRangeReq
                    FROM ItemDetail.Credits AS c WITH(NOLOCK)
                    INNER JOIN ItemDetail.Periods AS p WITH(NOLOCK) ON c.FkPeriod = p.PkPeriod;
            ");

            migrationBuilder.Sql(@"
                ALTER VIEW [ItemDetail].[vwDebits]
                AS
                    SELECT d.PkDebit, 
						d.UserId,
                        d.UserName, 
                        d.Name, 
                        d.Amount, 
                        d.FkPeriod, 
                        p.Name AS PeriodName, 
                        d.BeginDate, 
                        d.EndDate, 
                        d.WeeklyDOW, 
                        d.EverOtherWeekDOW, 
                        d.BiMonthlyDay1, 
                        d.BiMonthlyDay2, 
                        d.MonthlyDOM, 
                        d.Quarterly1Month, 
                        d.Quarterly1Day, 
                        d.Quarterly2Month, 
                        d.Quarterly2Day, 
                        d.Quarterly3Month, 
                        d.Quarterly3Day, 
                        d.Quarterly4Month, 
                        d.Quarterly4Day, 
                        d.SemiAnnual1Month, 
                        d.SemiAnnual1Day, 
                        d.SemiAnnual2Month, 
                        d.SemiAnnual2Day, 
                        d.AnnualMOY, 
                        d.AnnualDOM, 
                        d.DateRangeReq
                    FROM ItemDetail.Debits AS d WITH(NOLOCK)
                    INNER JOIN ItemDetail.Periods AS p WITH(NOLOCK) ON d.FkPeriod = p.PkPeriod;
            ");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER VIEW [ItemDetail].[vwCredits]
                AS
                    SELECT c.PkCredit, 
                        c.UserName, 
                        c.Name, 
                        c.Amount, 
                        c.FkPeriod, 
                        p.Name AS PeriodName, 
                        c.BeginDate, 
                        c.EndDate, 
                        c.WeeklyDOW, 
                        c.EverOtherWeekDOW, 
                        c.BiMonthlyDay1, 
                        c.BiMonthlyDay2, 
                        c.MonthlyDOM, 
                        c.Quarterly1Month, 
                        c.Quarterly1Day, 
                        c.Quarterly2Month, 
                        c.Quarterly2Day, 
                        c.Quarterly3Month, 
                        c.Quarterly3Day, 
                        c.Quarterly4Month, 
                        c.Quarterly4Day, 
                        c.SemiAnnual1Month, 
                        c.SemiAnnual1Day, 
                        c.SemiAnnual2Month, 
                        c.SemiAnnual2Day, 
                        c.AnnualMOY, 
                        c.AnnualDOM, 
                        c.DateRangeReq
                    FROM ItemDetail.Credits AS c WITH(NOLOCK)
                    INNER JOIN ItemDetail.Periods AS p WITH(NOLOCK) ON c.FkPeriod = p.PkPeriod;
            ");

            migrationBuilder.Sql(@"
                    ALTER VIEW [ItemDetail].[vwDebits]
                    AS
                        SELECT d.PkDebit, 
                            d.UserName, 
                            d.Name, 
                            d.Amount, 
                            d.FkPeriod, 
                            p.Name AS PeriodName, 
                            d.BeginDate, 
                            d.EndDate, 
                            d.WeeklyDOW, 
                            d.EverOtherWeekDOW, 
                            d.BiMonthlyDay1, 
                            d.BiMonthlyDay2, 
                            d.MonthlyDOM, 
                            d.Quarterly1Month, 
                            d.Quarterly1Day, 
                            d.Quarterly2Month, 
                            d.Quarterly2Day, 
                            d.Quarterly3Month, 
                            d.Quarterly3Day, 
                            d.Quarterly4Month, 
                            d.Quarterly4Day, 
                            d.SemiAnnual1Month, 
                            d.SemiAnnual1Day, 
                            d.SemiAnnual2Month, 
                            d.SemiAnnual2Day, 
                            d.AnnualMOY, 
                            d.AnnualDOM, 
                            d.DateRangeReq
                        FROM ItemDetail.Debits AS d WITH(NOLOCK)
                        INNER JOIN ItemDetail.Periods AS p WITH(NOLOCK) ON d.FkPeriod = p.PkPeriod;
            ");

        }
    }
}
