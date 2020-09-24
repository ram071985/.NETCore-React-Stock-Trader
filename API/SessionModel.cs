using System;
namespace API
{
    public class Session
    {
        public virtual int Id { get; set; }
        public virtual int UserId { get; set; }
        public virtual DateTime CreatedDate { get; set; }
    }
}
