using CORE.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


namespace API
{
    public class Startup
    {

        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddControllers().AddNewtonsoftJson();
            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = "client/build";
            });

            services.AddScoped<ICreateNewUserService, CreateNewUserService>();
            services.AddScoped<ICreateSessionService, CreateSessionService>();
            services.AddScoped<IDbSessionService, DbSessionService>();
            services.AddScoped<IAuthorizeUserService, AuthorizeUserService>();
            services.AddScoped<ICreateWalletService, CreateWalletService>();
            services.AddScoped<IGetUserInfoService, GetUserInfoService>();
            services.AddScoped<IBuyStockService, BuyStockService>();
            services.AddScoped<ISellStockService, SellStockService>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSpaStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            }
            );
        }
    }
}
