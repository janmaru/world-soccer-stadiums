using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using WorldSoccerStadiums.Models.Domain;
using WorldSoccerStadiums.Models.Map;

namespace WorldSoccerStadiums.Models.Service
{
    public class FeatureService : IFeatureService
    {
        private readonly IStadiumRepository stadiumRepository;
        public FeatureService(IStadiumRepository stadiumRepository)
        {
            this.stadiumRepository = stadiumRepository;
        }

        Geo IFeatureService.Get()
        {
            return new Geo()
            {
                Type = "FeatureCollection",
                Features = stadiumRepository.Get().Where(x=>!(x.Latitude == 0 && x.Longitude == 0)).Select(x => new Feature()
                {
                    Type = "Feature",
                    Geometry = new Geometry()
                    {
                        Type = "Point",
                        Coordinates = new List<double> { x.Longitude, x.Latitude }
                    },
                    Properties = new Properties()
                    {
                        Description = x.Capacity.Contains("?")? "0": x.Capacity,
                        Title = x.Name
                    }
                }).ToList()
            };
        }
    }
}
