using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WorldSoccerStadiums.Models.Extension;
using WorldSoccerStadiums.Models.Map;
using WorldSoccerStadiums.Models.Service;

namespace WorldSoccerStadiums.Controllers
{

    public class MapController : ControllerBase
    {
        private readonly IFeatureService featureService;
        public MapController(IFeatureService featureService)
        {
            this.featureService = featureService;
        }


        [HttpGet]
        [Route("api/v1/geo")]
        public Geo Markers()
        {
            return featureService.Get();
        }

        [HttpGet]
        [Route("api/v1/geo/centroid")]
        public IEnumerable<double> CentroidOfMarkers()
        {
            var g = featureService.Get().Features.Select(x => x.Geometry.Coordinates);
            return g.Centroid();
        }


        [HttpGet]
        [Route("api/v1/geo/random")]
        public IEnumerable<double> RandomMarker()
        {
            return featureService.Get().Features.Select(x => x.Geometry.Coordinates).Random();
        }
    }
}
