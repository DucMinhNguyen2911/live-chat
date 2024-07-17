using chatservice.Chat;
using chatservice.Context;
using StackExchange.Redis;
using System.Text.Json;

public class ChatHistory
{
    private readonly RedisContext _redisContext;
    private const string ChatHistoryKey = "chat:history";
    private const int MaxChatHistory = 200;

    public ChatHistory(RedisContext redisContext)
    {
        _redisContext = redisContext;
    }

    public void AddMessage(string username, string message)
    {
        var chatMessage = new ChatMessage
        {
            Username = username,
            Message = message
        };
        string jsonMessage = JsonSerializer.Serialize(chatMessage);
        // Add the new message to the beginning of the list
        _redisContext.Database.ListLeftPush(ChatHistoryKey, jsonMessage);

        // Trim the list to the maximum size
        _redisContext.Database.ListTrim(ChatHistoryKey, 0, MaxChatHistory - 1);
    }

    public ChatMessage[] GetMessages()
    {
        // Get all messages from the list
        string?[] jsonMessages = _redisContext.Database.ListRange(ChatHistoryKey).ToStringArray();
        if (jsonMessages == null)
        {
            return [];
        }
        var chatMessages = jsonMessages.Select(jsonMessage => JsonSerializer.Deserialize<ChatMessage>(jsonMessage)).ToArray();
        return chatMessages;
    }
}
