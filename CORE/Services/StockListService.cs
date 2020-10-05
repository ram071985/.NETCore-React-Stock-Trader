using System;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Antlr.Runtime;
using API;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace CORE.Services
{
    public interface  IStockListService
    {
        Task<StockListModel> GetStockListAsync();
    }

    public class StockListService : IStockListService
    {
        public StockListService()
        {

        }

        public async Task<StockListModel> GetStockListAsync()
        {
            var client = new RestClient($"");
            var request = new RestRequest(Method.GET);
            IRestResponse response = await client.ExecuteAsync(request);
            if (response.IsSuccessful)
            {
                var content = JsonConvert.DeserializeObject<StockListModel>(response.Content);
            }
        }
    }
}
