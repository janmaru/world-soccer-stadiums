using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace WorldSoccerStadiums.Models.Domain
{
    public class StadiumRepository : IStadiumRepository
    {
        #region private 
        //private readonly IEnumerable<Stadium> data;
        private string filePath = Path.Combine(Directory.GetCurrentDirectory(),
               "Data", "SoccerStadiums");
        #endregion

        public IEnumerable<Stadium> Get()
        {
            return  JsonConvert.DeserializeObject<IEnumerable<Stadium>>(File.ReadAllText(filePath));
        }
  
 
        Stadium IStadiumRepository.Get(int id)
        {
            return Get().Where(x => x.Id == id).FirstOrDefault();
        } 
    }

}
