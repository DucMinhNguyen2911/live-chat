namespace authservice.Users
{
    public class UserRegistationRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
