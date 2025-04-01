using eShop.Basket.API.Grpc;
using eShop.Basket.API.Repositories;
using eShop.Basket.API.Model;

var builder = WebApplication.CreateBuilder(args);

builder.AddBasicServiceDefaults();
builder.AddApplicationServices();

// Configuração do CORS para desenvolvimento
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
        });
    });
}

builder.Services.AddGrpc();

var app = builder.Build();

// Adiciona o middleware do CORS antes de outros middlewares
if (app.Environment.IsDevelopment())
{
    app.UseCors();
}

app.MapDefaultEndpoints();

// Configuração do gRPC
app.MapGrpcService<BasketService>().RequireCors("AllowAll");

app.Run();
