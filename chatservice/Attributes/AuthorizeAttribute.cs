namespace chatservice.Attributes
{
    using chatservice.Users;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
#nullable disable
            var user = (User)context.HttpContext.Items["User"];
            var _logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<AuthorizeAttribute>>();
            _logger.LogInformation("Authorization process is starting...");
            if (user == null)
            {
                // not logged in
                _logger.LogWarning("User is not logged in");
                context.Result = new JsonResult(new { Message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            else
            {
                _logger.LogInformation("User with ID: {userId} is logged in", user.Id);
            }
        }
    }
}