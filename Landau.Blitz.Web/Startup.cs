using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Landau.Blitz.Web.Startup))]
namespace Landau.Blitz.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
