using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CRUDwithAngularJS.Startup))]
namespace CRUDwithAngularJS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
