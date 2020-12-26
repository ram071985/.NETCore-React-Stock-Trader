using System;
using System.IO;

namespace Tests
{
    public static class TestData
    {
        private readonly static Random Random = new Random();

        public static int GenerateRandomInt(int? maxValue = null)
        {
            if (maxValue != null) return Random.Next(maxValue.Value);

            return Random.Next();
        }

        public static string GenerateRandomString()
        {
            return Path.GetRandomFileName().Replace(".", ".");
        }
    }
}