using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;  // Add this for ProblemDetails
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;

namespace API.Middlewares
{
    public class ExceptionHandlingMiddle
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddle> _logger;
        private readonly IWebHostEnvironment _env;

        public ExceptionHandlingMiddle(RequestDelegate next, ILogger<ExceptionHandlingMiddle> logger, IWebHostEnvironment env)
        {
            _next = next; 
            _logger = logger;   
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)  // Fix the typo here (Exxeption -> Exception)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = 500;

                var response = new ProblemDetails
                {
                    Status = 500,
                    Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                    Title = "Internal Server Error",
                };

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };  // Fix typo (OPTİONS -> options)
                var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}
