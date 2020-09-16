
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Stop
    {
        public int StopId { get; set; }
        [Required]
        public int RouteId { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public float Latitude { get; set; }
        [Required]
        public float Longitude { get; set; }
    }
}
