using chatservice.Attributes;
using chatservice.Context;
using Microsoft.AspNetCore.Mvc;

namespace chatservice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatContext _dbContext;
        private readonly RedisContext _redisContext;

        public ChatController(ChatContext dbContext, RedisContext redisContext)
        {
            _dbContext = dbContext;
            _redisContext = redisContext;
        }
        [Authorize]
        [HttpGet]
        public IActionResult GetChatHistory()
        {
            ChatHistory chatHistory = new ChatHistory(_redisContext);
            return Ok(chatHistory.GetMessages());
        }
    }
}
