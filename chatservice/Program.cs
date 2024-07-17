using chatservice;
using chatservice.Context;
using chatservice.Hubs;
using chatservice.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddDbContext<ChatContext>();
builder.Services.AddSingleton<RedisContext>();
builder.Services.AddSingleton<ConnectionUserService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<JwtMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/chatHub");

app.UseCors(x => x
.WithOrigins("http://localhost:3000", "https://localhost:3000")
.AllowAnyMethod()
.AllowAnyHeader()
.AllowCredentials());

app.Run();
