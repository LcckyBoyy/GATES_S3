using System.ComponentModel.DataAnnotations;

namespace GATES.Models
{
    public class blRegistrationUser
    {
        [Required]
        public string UserId { get; set; } = null!;

        [Required]
        public string Username { get; set; } = null!;

        [Required]
		public string Email { get; set; } = null!;

        [Required]
		public string PasswordSalt { get; set; } = null!;
	}
    public class blLoginUser
    {

        [Required]
        public string Username { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        public bool RememberMe { get; set; }
    }
}
