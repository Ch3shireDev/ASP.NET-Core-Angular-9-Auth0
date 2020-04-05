using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ResourceAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class DefaultController : ControllerBase
    {
        [HttpGet]
        [Route("public")]
        public ActionResult GetPublic()
        {
            return StatusCode(200, @"{""message"":""Public data""}");
        }

        [HttpGet]
        [Route("private")]
        [Authorize]
        public ActionResult GetPrivate()
        {
            return StatusCode(200, @"{""message"":""Private data!""}");
        }
    }
}