using System;
namespace API
{
    public class TransactionModel
    {
        public virtual int Id { get; set; }
        public virtual int UserId { get; set; }
        public virtual string Exchange { get; set; }
        public virtual decimal Deposit { get; set; }
        public virtual decimal Withdrawal { get; set; }
        public virtual int Quantity { get; set; }
        public virtual DateTime CreatedDate { get; set; }
    }
}