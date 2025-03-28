using API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models; // Swagger için güncellenmiş namespace

var builder = WebApplication.CreateBuilder(args);

//Add services to the container

builder.Services.AddDbContext<DataContext>(options =>{
    var config = builder.Configuration;
    var connectionString = config.GetConnectionString("DefaultConnection");

    options.UseSqlite(connectionString);
});

builder.Services.AddCors();

builder.Services.AddControllers();


builder.Services.AddOpenApi();

var app = builder.Build();
app.UseMiddleware<ExceptionHandlingMiddle>();

if(app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>{
        options.SwaggerEndpoint("/openapi/v1.json", "Demo API");
    });
}

app.UseHttpsRedirection();
app.UseCors(opt =>{
    opt.AllowAnyOrigin().AllowAnyMethod().WithOrigins("http://localhost:5500");
});
app.UseAuthorization();
app.MapControllers();

app.Run();
