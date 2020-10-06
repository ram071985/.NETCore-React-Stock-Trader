using System;
namespace API
{
    public class WalletModel
    {
        public virtual int Id { get; set; }
        public virtual int UserId { get; set; }
        public virtual decimal Balance { get; set; }
    }
}
