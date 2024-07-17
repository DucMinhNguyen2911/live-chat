namespace authservice.Authenticate
{
    public class AuthenticateResponse
    {
        public long Id { get; set; }
        public required string Username { get; set; }
        public required string Token { get; set; }
    }
}
