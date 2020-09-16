namespace DataAccess.DTOs
{
    public class StopDTO
    {
        public int Id { get; set; }
        public int RouteId { get; set; }
        public string DisplayName { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
