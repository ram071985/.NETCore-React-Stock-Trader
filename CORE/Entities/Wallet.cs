using System;
namespace CORE.Entities
{
    public class Wallet
    {
        public virtual int Id { get; set; }
        public virtual int UserId { get; set; }
        public virtual decimal Balance { get; set; }
        public virtual string Username { get; set; }
    }
}