using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using WorldSoccerStadiums.Models.Domain;
using WorldSoccerStadiums.Models.Extension;

namespace WorldSoccerStadiums.Controllers
{
    [Route("api/v1/[controller]")]
    public class StadiumController : ControllerBase
    {
        private readonly IStadiumRepository repoStadium;
        public StadiumController(IStadiumRepository repoStadium)
        {
            this.repoStadium = repoStadium;
        }

  
        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Stadium> List()
        {
            return repoStadium.Get();
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult PagedList([FromQuery] int pageSize, [FromQuery] int page, [FromQuery] string sorted, [FromQuery]  string filtered)
        {
            var count = repoStadium.Get().Count();
            var pages = count % pageSize == 0 ? (count / pageSize) : ((count / pageSize) + 1);
            var rows = repoStadium.Get();

            var jSorted = JsonConvert.DeserializeObject<IEnumerable<Sorted>>(sorted);
            if (jSorted.Count() > 0)
            {
                var srt = jSorted.FirstOrDefault();
                switch (srt.id)
                {
                    case "name":
                        if (srt.desc)
                            rows = from q in rows orderby q.Name descending select q;
                        else
                            rows = from q in rows orderby q.Name select q;
                        break;
                    case "nation":
                        if (srt.desc)
                            rows = from q in rows orderby q.Nation descending select q;
                        else
                            rows = from q in rows orderby q.Nation select q;
                        break;
                    case "town":
                        if (srt.desc)
                            rows = from q in rows orderby q.Town descending select q;
                        else
                            rows = from q in rows orderby q.Town select q;
                        break;
                    case "capacity":
                        if (srt.desc)
                            rows = from q in rows orderby q.Capacity descending select q;
                        else
                            rows = from q in rows orderby q.Capacity select q;
                        break;
                    default: //id
                        if (srt.desc)
                            rows = from q in rows orderby q.Id descending select q;
                        else
                            rows = from q in rows orderby q.Id select q;
                        break;
                }
            }

            rows = rows.Skip(page * pageSize).Take(pageSize);

            return Ok(new { rows = rows, pages = pages });
        }


        [HttpGet("{id}")]
        public Stadium Get(int id)
        {
            return repoStadium.Get(id);
        }
    }
}
