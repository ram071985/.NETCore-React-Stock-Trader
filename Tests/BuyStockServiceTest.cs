using System;
using System.Collections.Generic;
using CORE.Entities;
using CORE.Services;
using NHibernate;
using NSubstitute;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class BuyStockServiceTest
    {
        private IDbSessionService _dbSessionService;
        private IWalletQueryService _walletQueryService;
        private IStockQueryService _stockQueryService;

        private BuyStockService _sut;

        [SetUp]
        public void Setup()
        {
            _dbSessionService = Substitute.For<IDbSessionService>();
            _walletQueryService = Substitute.For<IWalletQueryService>();
            _stockQueryService = Substitute.For<IStockQueryService>();

            _sut = new BuyStockService(_dbSessionService, _walletQueryService, _stockQueryService);
        }

        [Test]
        public void should_update_wallet_withdrawal_return()
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
                        Balance = 15979.90m,
                        Holdings = 100
                    }
                });      

            _sut.UpdateWalletPurchase(userId, balance);             
        }

        [Test]
        public void should_throw_exception_when_balance_is_insufficient()
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
                        Balance = 70.80m,
                        Holdings = 100
                    }
             });
             
            Assert.Throws(Is.TypeOf<Exception>().And.Message.EqualTo("insufficient balance"), () => _sut.UpdateWalletPurchase(userId, balance));
        }

        [Test]
        public void should_add_withdrawal_record_return()
        {

            var userId = TestData.GenerateRandomInt();

            var exchange = TestData.GenerateRandomString();

            var withdrawal = 800.65m;

            var quantity = 20;

            var session = Substitute.For<ISession>();
            _dbSessionService.OpenSession().Returns(session);

            _sut.AddWithdrawal(userId, exchange, withdrawal, quantity);
            
        }

        [Test]
        public void should_create_purchase_record_return()
        {

            var userId = TestData.GenerateRandomInt();

            var company = TestData.GenerateRandomString();

            var symbol = TestData.GenerateRandomString();

            var quantity = 45;

            var session = Substitute.For<ISession>();
            _dbSessionService.OpenSession().Returns(session);

            _sut.CreatePurchaseRecord(userId, company, symbol, quantity);
           
        }

        [Test]
        public void should_update_purchase_record_return()
        {

            var userId = TestData.GenerateRandomInt();

            var company = TestData.GenerateRandomString();

            var symbol = TestData.GenerateRandomString();

            var quantity = 45;

            var session = Substitute.For<ISession>();
            _dbSessionService.OpenSession().Returns(session);

            _stockQueryService.QueryStocks(Arg.Any<ISession>(), Arg.Any<int>(), Arg.Any<string>())
                .Returns(new List<Stock>
                {
                    new Stock
                    {
                        UserId = userId,
                        Symbol = symbol,
                        Quantity = 13
                    }
                });

            _sut.CreatePurchaseRecord(userId, company, symbol, quantity);
        }
    }
}
