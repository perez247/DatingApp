using System.ComponentModel.DataAnnotations;

namespace DattingApp.Api.Dtos
{
    public class UserRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength=3, ErrorMessage="Minimum of 3 and Maximum of 8 characters")]
        public string Password { get; set; }
    }
}