using chatservice.Context;
using chatservice.Users;
using Microsoft.AspNetCore.SignalR;

namespace chatservice.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ConnectionUserService _connectionUserService;
        private readonly RedisContext _redisContext;
        public ChatHub(ConnectionUserService connectionUserService, RedisContext redisContext)
        {
            _connectionUserService = connectionUserService;
            _redisContext = redisContext;
        }
        public override async Task OnConnectedAsync()
        {
            var user = (User)Context.GetHttpContext().Items["User"];
            if (user != null)
            {
                _connectionUserService.AddConnection(user.Id, Context.ConnectionId);
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _connectionUserService.RemoveConnection(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessageToAll(string message)
        {
            var user = (User)Context.GetHttpContext().Items["User"];
            if (user != null)
            {
                ChatHistory chatHistory = new ChatHistory(_redisContext);
                chatHistory.AddMessage(user.Username, message);
                await Clients.All.SendAsync("ReceiveMessage", user.Username, message);
            }
        }
    }
}
