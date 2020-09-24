using System;
namespace CORE.Entities
{
    public class User
    {
        public virtual int Id { get; set; }
        public virtual string Username { get; set; }
        public virtual string Password { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual DateTime LastActiveAt { get; set; }
    }
}
