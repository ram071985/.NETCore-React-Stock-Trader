using System;
namespace CORE.Entities
{
    public class Transaction
    {
        public virtual int Id { get; set; }
        public virtual int UserId { get; set; }
        public virtual string Exchange { get; set; }
        public virtual decimal Deposit { get; set; }
        public virtual decimal Withdrawal { get; set; }
        public virtual decimal Balance { get; set; }
    }
}

