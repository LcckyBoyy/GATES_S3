namespace GATES.Models
{
    public class UserRegistration
    {
        public string UserId { get; set; } = null!;

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string PasswordSalt { get; set; } = null!;

    }
}
