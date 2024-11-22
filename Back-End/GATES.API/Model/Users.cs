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
}
