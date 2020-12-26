using System;
namespace API.Models
{
    public class WalletModel
    {
        public virtual int Id { get; set; }

        public virtual int UserId { get; set; }

        public virtual decimal Balance { get; set; }

        public virtual string Username { get; set; }

        public virtual decimal Holdings { get; set; }
    }
}
