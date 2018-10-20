using System.ComponentModel.DataAnnotations;

namespace DattingApp.Api.Dtos
{
    public class UserRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength=2, ErrorMessage="Minimum of 2 and Maximum of 8")]
        public string Password { get; set; }
    }
}