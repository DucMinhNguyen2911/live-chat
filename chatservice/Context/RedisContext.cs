using StackExchange.Redis;

namespace chatservice.Context
{
    public class RedisContext
    {
        private readonly ConnectionMultiplexer _redis;
        private readonly IDatabase _database;
        public RedisContext(IConfiguration configuration)
        {
            var connectionString =
                $"{Environment.GetEnvironmentVariable("REDIS_HOST")}" +
                $",password={Environment.GetEnvironmentVariable("REDIS_PASSWORD")}";
            _redis = ConnectionMultiplexer.Connect(connectionString);
            _database = _redis.GetDatabase();
        }

        public IDatabase Database => _database;
    }
}
