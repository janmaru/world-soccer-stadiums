using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WorldSoccerStadiums.Models.Domain;

namespace WorldSoccerStadiums.Controllers
{
    [Route("api/v1/stadium")]
    public class StadiumController : ControllerBase
    {
        private readonly IStadiumRepository repoStadium;
        public StadiumController(IStadiumRepository repoStadium)
        {
            this.repoStadium = repoStadium;
        }

        // GET: api/Stadium
        [HttpGet]
        public IEnumerable<Stadium> Get()
        {
            return repoStadium.Get();
        }

     
        [HttpGet("{id}", Name = "Get")]
        public Stadium Get(int id)
        {
            return repoStadium.Get(id);
        } 
    }
}
