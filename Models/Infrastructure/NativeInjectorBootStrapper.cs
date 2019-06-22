using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using WorldSoccerStadiums.Models.Bridge;
using WorldSoccerStadiums.Models.Domain;
using WorldSoccerStadiums.Models.Service;

namespace WorldSoccerStadiums.Models.Infrastructure
{
    public class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services, IConfiguration configuration)
        {

            //get the HTTP context in any class that is managed by the ASP.NET Core dependency injection system
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services
                .AddSingleton<IStadiumRepository, StadiumRepository>()
                .AddSingleton<IFeatureService, FeatureService>()
                .AddSingleton(configuration);

            AutoMapperConfig.RegisterMappings();
        }
    }
}
