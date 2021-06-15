using FPNg.API.Data.Domain;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.Linq;

namespace FPNg.API.Data.Context
{
    public partial class FPNgContext : DbContext
    {
        private readonly string Conn = "Data Source=DESKTOP-VPBJU0V\\APPLICATION;Initial Catalog=FinancialPlannerNg;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False;";

        public FPNgContext() { }
        public FPNgContext(DbContextOptions<FPNgContext> options) : base(options) { }

        public virtual DbSet<Credit> Credits { get; set; }
        public virtual DbSet<Debit> Debits { get; set; }
        public virtual DbSet<InitialAmount> InitialAmounts { get; set; }
        public virtual DbSet<Period> Periods { get; set; }
        public virtual DbSet<VwCredit> VwCredits { get; set; }
        public virtual DbSet<VwDebit> VwDebits { get; set; }
        public virtual DbSet<Ledger> Ledger { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Conn);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Credit>(entity =>
            {
                entity.HasKey(e => e.PkCredit);

                entity.ToTable("Credits", "ItemDetail");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.AnnualDom).HasColumnName("AnnualDOM");

                entity.Property(e => e.AnnualMoy).HasColumnName("AnnualMOY");

                entity.Property(e => e.BeginDate).HasColumnType("date");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.EverOtherWeekDow).HasColumnName("EverOtherWeekDOW");

                entity.Property(e => e.MonthlyDom).HasColumnName("MonthlyDOM");

                entity.Property(e => e.Name).HasMaxLength(75);

                entity.Property(e => e.WeeklyDow).HasColumnName("WeeklyDOW");

                entity.HasOne(d => d.Period)
                    .WithMany(p => p.Credits)
                    .HasForeignKey(d => d.FkPeriod)
                    .HasConstraintName("FK_Credits_Periods");
            });

            modelBuilder.Entity<Debit>(entity =>
            {
                entity.HasKey(e => e.PkDebit);

                entity.ToTable("Debits", "ItemDetail");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.AnnualDom).HasColumnName("AnnualDOM");

                entity.Property(e => e.AnnualMoy).HasColumnName("AnnualMOY");

                entity.Property(e => e.BeginDate).HasColumnType("date");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.EverOtherWeekDow).HasColumnName("EverOtherWeekDOW");

                entity.Property(e => e.MonthlyDom).HasColumnName("MonthlyDOM");

                entity.Property(e => e.Name).HasMaxLength(75);

                entity.Property(e => e.WeeklyDow).HasColumnName("WeeklyDOW");

                entity.HasOne(d => d.Period)
                    .WithMany(p => p.Debits)
                    .HasForeignKey(d => d.FkPeriod)
                    .HasConstraintName("FK_Debits_Periods");
            });

            modelBuilder.Entity<InitialAmount>(entity =>
            {
                entity.HasKey(e => e.PkInitialAmount);

                entity.ToTable("InitialAmount", "ItemDetail");

                entity.Property(e => e.PkInitialAmount).HasColumnName("PkInitialAmount");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.BeginDate).HasColumnType("date");
              
            });

            modelBuilder.Entity<Period>(entity =>
            {
                entity.HasKey(e => e.PkPeriod);

                entity.ToTable("Periods", "ItemDetail");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(75);
            });

            modelBuilder.Entity<VwCredit>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwCredits", "ItemDetail");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.AnnualDom).HasColumnName("AnnualDOM");

                entity.Property(e => e.AnnualMoy).HasColumnName("AnnualMOY");

                entity.Property(e => e.BeginDate).HasColumnType("date");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.EverOtherWeekDow).HasColumnName("EverOtherWeekDOW");

                entity.Property(e => e.MonthlyDom).HasColumnName("MonthlyDOM");

                entity.Property(e => e.Name).HasMaxLength(75);

                entity.Property(e => e.PeriodName)
                    .IsRequired()
                    .HasMaxLength(75);

                entity.Property(e => e.WeeklyDow).HasColumnName("WeeklyDOW");
            });

            modelBuilder.Entity<VwDebit>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwDebits", "ItemDetail");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.AnnualDom).HasColumnName("AnnualDOM");

                entity.Property(e => e.AnnualMoy).HasColumnName("AnnualMOY");

                entity.Property(e => e.BeginDate).HasColumnType("date");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.EverOtherWeekDow).HasColumnName("EverOtherWeekDOW");

                entity.Property(e => e.MonthlyDom).HasColumnName("MonthlyDOM");

                entity.Property(e => e.Name).HasMaxLength(75);

                entity.Property(e => e.PeriodName)
                    .IsRequired()
                    .HasMaxLength(75);

                entity.Property(e => e.WeeklyDow).HasColumnName("WeeklyDOW");
            });

            modelBuilder.Entity<Ledger>(entity =>
            {
                entity.HasNoKey();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
