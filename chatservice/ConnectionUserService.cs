namespace chatservice
{
    public class ConnectionUserService
    {
        private readonly Dictionary<long, HashSet<string>> _connections = new Dictionary<long, HashSet<string>>();

        public void AddConnection(long userId, string connectionId)
        {
            lock (_connections)
            {
                if (!_connections.ContainsKey(userId))
                {
                    _connections[userId] = new HashSet<string>();
                }
                _connections[userId].Add(connectionId);
            }
        }

        public void RemoveConnection(string connectionId)
        {
            lock (_connections)
            {
                foreach (var userId in _connections.Keys)
                {
                    if (_connections[userId].Remove(connectionId) && _connections[userId].Count == 0)
                    {
                        _connections.Remove(userId);
                        break;
                    }
                }
            }
        }

        public IEnumerable<string> GetConnectionIds(long userId)
        {
            lock (_connections)
            {
                return _connections.TryGetValue(userId, out var connectionIds) ? connectionIds : Enumerable.Empty<string>();
            }
        }
    }
}
