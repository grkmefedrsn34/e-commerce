namespace API.Middlewares
{
    public class ExceptionHandlingMiddle
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddle> _logger;
        private readonly IWebHostEnvironment _env;
        public ExceptionHandlingMiddle(RequestDelegate next, ILogger<ExceptionHandlingMiddle> logger,IWebHostEnvironment _env)
        {
            _next = next; 
            _logger = logger;   
            _env = _env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try{
                await _next(context);
            }catch(Exxeption ex){
                _logger.LogError(ex,ex.Message);
                context.Response.ContentType ="application/json";
                context.Response.StatusCode = 500;

                var response = new ProblemDetails
                {
                    Status =500,
                    Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString(): null ,
                    Title = "Internal Server Error",
                };

                var OPTİONS = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response,OPTİONS);
                await context.Response.WriteAsync(json);
            }
        }
    }
}