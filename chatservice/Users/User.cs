namespace chatservice.Users
{
    public class User
    {
        public long Id { get; set; }

        public string Username { get; set; } = null!;

        public string HashedPassword { get; set; } = null!;
    }
}
