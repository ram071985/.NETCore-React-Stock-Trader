using System;
namespace API.Models
{
    public class StockModel
    {
        public virtual int Id { get; set; }

        public virtual int UserId { get; set; }

        public virtual string Company { get; set; }

        public virtual int Quantity { get; set; }

        public virtual DateTime CreatedDate { get; set; }

        public virtual string Symbol { get; set; }
    }
}
