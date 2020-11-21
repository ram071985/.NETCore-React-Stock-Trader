using System;
namespace CORE.Entities
{
    public class Stock
    {
        public virtual int Id { get; set; }

        public virtual int UserId { get; set; }

        public virtual string Company { get; set; }

        public virtual int Quantity { get; set; }

        public virtual DateTime CreatedDate { get; set; }

        public virtual string Symbol { get; set; }
    }
}
