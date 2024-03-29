﻿using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.ItemDetail.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Repository
{

    /// <summary>
    ///     Debit Repository
    /// </summary>
    public class RepoDebit : IRepoDebit
    {
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly FPNgContext _context;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public RepoDebit(FPNgContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Return List of all Debits for given User using the View vwDebit
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<List<VwDebit>>: List of Debits for the Authorized User</returns>
        public async Task<List<VwDebit>> GetDebits(Guid userId)
        {
            try
            {
                return await _context.VwDebits.Where(d => d.UserId == userId).ToListAsync();
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }

        /// <summary>
        ///     Get a specific Debit using the View vwDebit
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<VwDebit>: The requested Debit</returns>
        public async Task<VwDebit> GetDebit(int id)
        {
            try
            {
                return await _context.VwDebits.SingleOrDefaultAsync(c => c.PkDebit == id);
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }

        /// <summary>
        ///     Update Existing Debit
        /// </summary>
        /// <param name="id">int: Debit Id</param>
        /// <param name="debit">Debit: The Edited Debit Model</param>
        /// <returns>Task<bool>: Was Debit Updated?</returns>
        public async Task<bool> PutDebit(int id, Debit debit)
        {
            try
            {
                _context.Entry(debit).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!DebitExists(id))
                {
                    _log.Error("Debit not found");
                    return false;
                }
                _log.Error(ex.ToString());
                return false;
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Add new Debit
        /// </summary>
        /// <param name="debit">Debit: The input Debit Model</param>
        /// <returns>Task<bool>: Was the debit created? T/F</returns>
        public async Task<bool> PostDebit(Debit debit)
        {
            try
            {
                _context.Debits.Add(debit);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Delete a specific Debit
        /// </summary>
        /// <param name="id">int: Id of the Debit</param>
        /// <returns>Task<bool>: Was the Debit Deleted?</returns>
        public async Task<bool> DeleteDebit(int id)
        {
            try
            {
                var debit = await _context.Debits.FindAsync(id);
                _context.Debits.Remove(debit);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Verify Debit exists
        /// </summary>
        /// <param name="id">int: Debit Id</param>
        /// <returns>Boolean: Does the Debit Exist?</returns>
        private bool DebitExists(int id)
        {
            return _context.Debits.Any(e => e.PkDebit == id);
        }
    }
}
