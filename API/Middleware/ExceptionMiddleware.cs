using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                context.Response.StatusCode = 500;
                context.Response.Headers.Add("content-type", "application/json");
                var errorMessage = new ErrorMessage { Text = e.Message };
                await context.Response.WriteAsync(JsonSerializer.Serialize(errorMessage));
            }              
        }

    }
}

public class ErrorMessage
{
    public string Text { get; set; }
}
