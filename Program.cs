using LoginBackend.Models;
using LoginBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Bind MongoDBSettings from configuration
builder.Services.Configure<MongoDBSettings>(
    builder.Configuration.GetSection("MongoDBSettings"));  // <-- this is the fix

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();
builder.Services.AddSingleton<UserService>();

var app = builder.Build();
app.UseDefaultFiles();
// Serve static files (HTML, CSS, JS) from wwwroot folder
app.UseStaticFiles();

// Swagger UI for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.MapGet("/login", context =>
{
    context.Response.ContentType = "text/html";
    return context.Response.SendFileAsync("wwwroot/login.html");
});


app.Run();
