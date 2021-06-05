using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.Display.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.Display.Repository
{
    /// <summary>
    ///     This class takes a flatfile of data from a stored procedure,
    ///     where the structure consists of a row for every day, but the day data will repeat if there 
    ///     Debits and Credits Items for that day.  For those rows only the Item data will be different.
    ///     Then the functions in this class will transform the data so the Day row only occurs once and
    ///     any Item data will be placed in an "Items" array. 
    /// </summary>
    public class DataTransformation : IDataTransformation
    {
        /// <summary>
        ///     Base Constructor
        /// </summary>
        public DataTransformation() { }

        /// <summary>
        ///     Primary controlling function that calls the individual tranform features
        /// </summary>
        /// <param name="ledger">List<Ledger></param>
        /// <returns>List<LedgerVM></returns>
        public List<LedgerVM> TransformLedgerData(List<Ledger> ledger)
        {
            List<LedgerVM> ledgerVm = CreateLedgerVM(ledger);
            List<ItemVM> itemsVm = GetItemsList(ledger);
            return AttachItems(ledgerVm, itemsVm);
        }

        /// <summary>
        ///     Iterates through the base Ledger data, summarizing the primary 
        ///     rollup record representing a date value with summary data.  
        ///     At this point the Items array is yet to filed.
        /// </summary>
        /// <param name="ledger">List<Ledger></param>
        /// <returns>List<LedgerVM></returns>
        private List<LedgerVM> CreateLedgerVM(List<Ledger> ledger)
        {
            List<LedgerVM> ledgerVm;
            ledgerVm = (
                from lvm in ledger
                group lvm by new { lvm.RollupKey, lvm.Year, lvm.WDate, lvm.CreditSummary, lvm.DebitSummary, lvm.Net, lvm.RunningTotal } into grp
                select new LedgerVM
                {
                    RollupKey = grp.Key.RollupKey,
                    Year = grp.Key.Year,
                    WDate = grp.Key.WDate,
                    CreditSummary = grp.Key.CreditSummary,
                    DebitSummary = grp.Key.DebitSummary,
                    Net = grp.Key.Net,
                    RunningTotal = grp.Key.RunningTotal
                }
            ).ToList();
            return ledgerVm;
        }

        /// <summary>
        ///     Now go back to the base Ledger list and 
        ///     isolate the Debit & Credit Items into a temporary list container
        /// </summary>
        /// <param name="ledger">List<Ledger></param>
        /// <returns>List<ItemVM></returns>
        private List<ItemVM> GetItemsList(List<Ledger> ledger)
        {
            List<ItemVM> itemsVm;
            itemsVm = (
                from lvm in ledger
                where !string.IsNullOrEmpty(lvm.OccurrenceDate.ToString())
                select new ItemVM
                {
                    RollupKey = lvm.RollupKey,
                    ItemKey = 0,
                    Year = lvm.Year,
                    OccurrenceDate = lvm.OccurrenceDate.ToString(),
                    ItemType = lvm.ItemType,
                    PeriodName = lvm.PeriodName,
                    Name = lvm.Name,
                    Amount = lvm.Amount
                }
            ).ToList();
            return itemsVm;
        }

        /// <summary>
        ///     Finally bring in the new Ledger summary "ledgerVm" 
        ///     and add the grouped Items "itemsVm" associated with the specific date rollup record
        ///     Also populate the ItemKey value for the individual records 
        ///     in the Items array with a counter value.
        ///     Then return the completed transformed dataset.
        /// </summary>
        /// <param name="ledgerVm">List<LedgerVM></param>
        /// <param name="itemsVm">List<ItemVM></param>
        /// <returns>ist<LedgerVM></returns>
        private List<LedgerVM> AttachItems(List<LedgerVM> ledgerVm, List<ItemVM> itemsVm)
        {
            foreach (var element in ledgerVm)
            {
                List<ItemVM> sublst = (itemsVm.Where(i => i.RollupKey == element.RollupKey && i.Year == element.Year)).ToList();
                if (sublst.Count > 0)
                {
                    int cntr = 1;
                    foreach (var item in sublst.OrderBy(s => s.OccurrenceDate).ThenBy(s => s.ItemType))
                    {
                        item.ItemKey = cntr;
                        cntr++;
                    }
                    element.Items.AddRange(sublst.OrderBy(s => s.ItemKey));
                }
            }
            return ledgerVm;
        }
    }
}
