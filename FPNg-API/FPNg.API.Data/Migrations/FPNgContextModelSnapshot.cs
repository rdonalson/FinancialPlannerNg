﻿// <auto-generated />
using System;
using FPNg.API.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FPNg.API.Data.Migrations
{
    [DbContext(typeof(FPNgContext))]
    partial class FPNgContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.13")
                .HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FPNg.API.Data.Domain.Credit", b =>
                {
                    b.Property<int>("PkCredit")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal?>("Amount")
                        .HasColumnType("money");

                    b.Property<int?>("AnnualDom")
                        .HasColumnName("AnnualDOM")
                        .HasColumnType("int");

                    b.Property<int?>("AnnualMoy")
                        .HasColumnName("AnnualMOY")
                        .HasColumnType("int");

                    b.Property<DateTime?>("BeginDate")
                        .HasColumnType("date");

                    b.Property<int?>("BiMonthlyDay1")
                        .HasColumnType("int");

                    b.Property<int?>("BiMonthlyDay2")
                        .HasColumnType("int");

                    b.Property<bool>("DateRangeReq")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("date");

                    b.Property<int?>("EverOtherWeekDow")
                        .HasColumnName("EverOtherWeekDOW")
                        .HasColumnType("int");

                    b.Property<int?>("FkPeriod")
                        .HasColumnType("int");

                    b.Property<int?>("MonthlyDom")
                        .HasColumnName("MonthlyDOM")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(75)")
                        .HasMaxLength(75);

                    b.Property<int?>("Quarterly1Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly1Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly2Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly2Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly3Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly3Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly4Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly4Month")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual1Day")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual1Month")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual2Day")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual2Month")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("WeeklyDow")
                        .HasColumnName("WeeklyDOW")
                        .HasColumnType("int");

                    b.HasKey("PkCredit");

                    b.HasIndex("FkPeriod");

                    b.ToTable("Credits","ItemDetail");
                });

            modelBuilder.Entity("FPNg.API.Data.Domain.Debit", b =>
                {
                    b.Property<int>("PkDebit")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal?>("Amount")
                        .HasColumnType("money");

                    b.Property<int?>("AnnualDom")
                        .HasColumnName("AnnualDOM")
                        .HasColumnType("int");

                    b.Property<int?>("AnnualMoy")
                        .HasColumnName("AnnualMOY")
                        .HasColumnType("int");

                    b.Property<DateTime?>("BeginDate")
                        .HasColumnType("date");

                    b.Property<int?>("BiMonthlyDay1")
                        .HasColumnType("int");

                    b.Property<int?>("BiMonthlyDay2")
                        .HasColumnType("int");

                    b.Property<bool>("DateRangeReq")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("date");

                    b.Property<int?>("EverOtherWeekDow")
                        .HasColumnName("EverOtherWeekDOW")
                        .HasColumnType("int");

                    b.Property<int?>("FkPeriod")
                        .HasColumnType("int");

                    b.Property<int?>("MonthlyDom")
                        .HasColumnName("MonthlyDOM")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(75)")
                        .HasMaxLength(75);

                    b.Property<int?>("Quarterly1Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly1Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly2Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly2Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly3Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly3Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly4Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly4Month")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual1Day")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual1Month")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual2Day")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual2Month")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("WeeklyDow")
                        .HasColumnName("WeeklyDOW")
                        .HasColumnType("int");

                    b.HasKey("PkDebit");

                    b.HasIndex("FkPeriod");

                    b.ToTable("Debits","ItemDetail");
                });

            modelBuilder.Entity("FPNg.API.Data.Domain.InitialAmount", b =>
                {
                    b.Property<int>("PkInitialAmount")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("PkInitialAmount")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal?>("Amount")
                        .HasColumnType("money");

                    b.Property<DateTime?>("BeginDate")
                        .HasColumnType("date");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("PkInitialAmount");

                    b.ToTable("InitialAmount","ItemDetail");
                });

            modelBuilder.Entity("FPNg.API.Data.Domain.Ledger", b =>
                {
                    b.Property<double?>("Amount")
                        .HasColumnType("float");

                    b.Property<double?>("CreditSummary")
                        .HasColumnType("float");

                    b.Property<double?>("DebitSummary")
                        .HasColumnType("float");

                    b.Property<int?>("ItemType")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Net")
                        .HasColumnType("float");

                    b.Property<DateTime?>("OccurrenceDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("PeriodName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("RollupKey")
                        .HasColumnType("int");

                    b.Property<double?>("RunningTotal")
                        .HasColumnType("float");

                    b.Property<DateTime?>("WDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("Year")
                        .HasColumnType("int");

                    b.ToTable("Ledger");
                });

            modelBuilder.Entity("FPNg.API.Data.Domain.Period", b =>
                {
                    b.Property<int>("PkPeriod")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(75)")
                        .HasMaxLength(75);

                    b.HasKey("PkPeriod");

                    b.ToTable("Periods","ItemDetail");
                });

            modelBuilder.Entity("FPNg.API.Data.Domain.Credit", b =>
                {
                    b.HasOne("FPNg.API.Data.Domain.Period", "Period")
                        .WithMany("Credits")
                        .HasForeignKey("FkPeriod")
                        .HasConstraintName("FK_Credits_Periods");
                });

            modelBuilder.Entity("FPNg.API.Data.Domain.Debit", b =>
                {
                    b.HasOne("FPNg.API.Data.Domain.Period", "Period")
                        .WithMany("Debits")
                        .HasForeignKey("FkPeriod")
                        .HasConstraintName("FK_Debits_Periods");
                });
#pragma warning restore 612, 618
        }
    }
}
