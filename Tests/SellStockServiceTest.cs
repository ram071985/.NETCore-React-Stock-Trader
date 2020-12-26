using System.Collections.Generic;
using CORE.Entities;
using CORE.Services;
using NHibernate;
using NSubstitute;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class SellStockServiceTest
    {
        private IDbSessionService _dbSessionService;
        private IWalletQueryService _walletQueryService;
        private IStockQueryService _stockQueryService;

        private SellStockService _sut;

        [SetUp]
        public void Setup()
        {
            _dbSessionService = Substitute.For<IDbSessionService>();
            _walletQueryService = Substitute.For<IWalletQueryService>();
            _stockQueryService = Substitute.For<IStockQueryService>();

            _sut = new SellStockService(_dbSessionService, _walletQueryService, _stockQueryService);
        }

        [Test]
        public void should_update_wallet_deposit_return()
        {

            var userId = TestData.GenerateRandomInt();

            var balance = 100.90m;

            var session = Substitute.For<ISession>();
            _dbSessionService.OpenSession().Returns(session);

            _walletQueryService.QueryWallets(Arg.Any<ISession>(), Arg.Any<int>())
                .Returns(new List<Wallet>
                {
                    new Wallet
                    {
                        UserId = userId,
                        Balance = 10356.30m,
                        Holdings = 300.65m
                    }
                });

            _sut.UpdateWalletSale(userId, balance);
        }

        [Test]
        public void should_add_deposit_record_return()
        {

            var userId = TestData.GenerateRandomInt();

            var exchange = TestData.GenerateRandomString();

            var deposit = 1000.23m;

            var quantity = 50;

            var session = Substitute.For<ISession>();
            _dbSessionService.OpenSession().Returns(session);

            _sut.AddDeposit(userId, exchange, deposit, quantity);
        }

        [Test]
        public void should_create_sale_record_return()
        {

            var userId = TestData.GenerateRandomInt();

            var company = TestData.GenerateRandomString();

            var symbol = TestData.GenerateRandomString();

            var quantity = 70;

            var session = Substitute.For<ISession>();
            _dbSessionService.OpenSession().Returns(session);

            _sut.CreateSaleRecord(userId, company, symbol, quantity);
        }

        [Test]
        public void should_update_sale_record_return()
        {

            var userId = TestData.GenerateRandomInt();

            var company = TestData.GenerateRandomString();

            var symbol = TestData.GenerateRandomString();

            var quantity = 70;

            var session = Substitute.For<ISession>();
            _dbSessionService.OpenSession().Returns(session);

            _stockQueryService.QueryStocks(Arg.Any<ISession>(), Arg.Any<int>(), Arg.Any<string>())
                .Returns(new List <Stock>
                {
                    new Stock
                    {
                        UserId = userId,
                        Symbol = symbol,
                        Quantity = 28
                    }
                });

            _sut.CreateSaleRecord(userId, company, symbol, quantity);
        }
    }
}
