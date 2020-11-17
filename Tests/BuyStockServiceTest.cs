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

        private BuyStockService _sut;

        [SetUp]
        public void Setup()
        {
            _dbSessionService = Substitute.For<IDbSessionService>();
            _walletQueryService = Substitute.For<IWalletQueryService>();

            _sut = new BuyStockService(_dbSessionService, _walletQueryService);
        }

        [Test]
        public void should_update_wallet_withdrawal_return()
        {
            Random rnd = new Random();

            var userId = rnd.Next();

            var balance = 15679.90m;

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

            var transaction = Substitute.For<ITransaction>();

            var result = _sut.UpdateWalletPurchase(userId, balance);

            // test result came back expected
             
        }
    }
}
