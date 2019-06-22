namespace WorldSoccerStadiums.Models.Domain
{
    public class Stadium
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Nation { get; set; }
        public string Town { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Capacity { get; set; }
    }
}
 