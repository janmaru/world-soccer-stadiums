using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WorldSoccerStadiums.Models.Domain;

namespace WorldSoccerStadiums.Controllers
{

    public class StadiumController : ControllerBase
    {
        private readonly IStadiumRepository repoStadium;
        public StadiumController(IStadiumRepository repoStadium)
        {
            this.repoStadium = repoStadium;
        }

        // GET: api/Stadium
        [Route("api/v1/stadium")]
        [HttpGet]
        public IEnumerable<Stadium> Get()
        {
            return repoStadium.Get();
        }

        [HttpGet]
        [Route("api/v1/stadium-paging")]
        public IActionResult Get([FromQuery] int pageSize, [FromQuery] int page, [FromQuery] string sorted, [FromQuery]  string filtered)
        {
            return Ok(new { children = repoStadium.Get().ToList().Take(pageSize).Skip(page* pageSize) , count = repoStadium.Get().Count() });
        }


        [HttpGet("api/v1/stadium/{id}", Name = "Get")]
        public Stadium Get(int id)
        {
            return repoStadium.Get(id);
        } 
    }
}
