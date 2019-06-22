using System.Collections.Generic;

namespace WorldSoccerStadiums.Models.Domain
{
    public interface IStadiumRepository
    {
        IEnumerable<Stadium> Get();
        Stadium Get(int Id);
    }
}
