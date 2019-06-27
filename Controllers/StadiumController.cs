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
            var count = repoStadium.Get().Count();
            var pages = count % pageSize == 0 ? (count / pageSize) : ((count / pageSize) + 1);
            return Ok(new { rows = repoStadium.Get().ToList().Take(pageSize).Skip(page* pageSize) , pages = pages });
        }


        [HttpGet("api/v1/stadium/{id}", Name = "Get")]
        public Stadium Get(int id)
        {
            return repoStadium.Get(id);
        } 
    }
}
