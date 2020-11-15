using System;
using CORE.Services;
using NHibernate;
using NSubstitute;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class BuyStockTest
    {

        private readonly Random _random = new Random();

        private IDbSessionService _dbSessionService;
        private IBuyStockService _buyStockService;
        private ISellStockService _sellStockService;

        [SetUp]
        public void Setup()
        {
            _dbSessionService = Substitute.For<IDbSessionService>();
            _buyStockService = Substitute.For<IBuyStockService>();
            _sellStockService = Substitute.For<ISellStockService>();
        }

        [Test]
        public void should_update_wallet_withdrawal_return()
        {
            Random rnd = new Random();

            var userId = rnd.Next();
            var balance = 15679.90m;

            _buyStockService.UpdateWalletPurchase(userId, balance);

            _buyStockService.Received(1).UpdateWalletPurchase(
                Arg.Any<ISession.BeginTransaction()>,

             
        }
    }
}
