using System;
using System.Linq;
using Microsoft.Data.Entity.Storage.Internal;
using Microsoft.Extensions.Logging;

namespace Score_it.Tools
{
    public class SqlLoggerProvider : ILoggerProvider
    {
        private static string[] _categories =
        {
            typeof(RelationalCommandBuilderFactory).FullName,
            typeof(SqlServerConnection).FullName
        };

        public ILogger CreateLogger(string categoryName)
        {
            if (_categories.Contains(categoryName))
            {
                return new MyLogger();
            }

            return new NullLogger();
        }

        public void Dispose()
        { }

        private class MyLogger : ILogger
        {
            public bool IsEnabled(LogLevel logLevel)
            {
                return true;
            }

            public void Log(LogLevel logLevel, int eventId, object state, Exception exception, Func<object, Exception, string> formatter)
            {
                var sqlLog = formatter(state, exception);
                sqlLog += "\r\n";

                if(sqlLog.StartsWith("Closing connection"))
                {
                    sqlLog += "\r\n";
                }

                Console.Write(sqlLog);
            }

            public IDisposable BeginScopeImpl(object state)
            {
                return null;
            }
        }

        private class NullLogger : ILogger
        {
            public bool IsEnabled(LogLevel logLevel)
            {
                return false;
            }

            public void Log(LogLevel logLevel, int eventId, object state, Exception exception, Func<object, Exception, string> formatter)
            { }

            public IDisposable BeginScopeImpl(object state)
            {
                return null;
            }
        }
    }
}
