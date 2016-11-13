contract('ARCToken', function(accounts) {

  var splittercontract;
  var self = this;

  var balances = [];

  describe('Deploy splitter token', function() {
    it("should deploy splitter contract", function(done) {
      splitter.new([accounts[1], accounts[2], accounts[3], accounts[4]]).then(function(instance) {
        splittercontract = instance;
        assert.isNotNull(splittercontract);

        balances[1] = self.web3.eth.getBalance(accounts[1]).toNumber();
        balances[2] = self.web3.eth.getBalance(accounts[2]).toNumber();
        balances[3] = self.web3.eth.getBalance(accounts[3]).toNumber();
        balances[4] = self.web3.eth.getBalance(accounts[4]).toNumber();

        console.log('1=',balances[1]);
        console.log('2=',balances[2]);
        console.log('3=',balances[3]);
        console.log('4=',balances[4]);

        done();
      });


    });

    it("should send 1 ETH to splitter contract", function(done) {

      self.web3.eth.sendTransaction({
        from: accounts[0],
        to: splittercontract.address,
        value: 1e18,
      }, function(r, s) {
        try {
          assert.equal(1e18,self.web3.eth.getBalance(splittercontract.address).toNumber());
          done();
        } catch (e) {
          //console.log(e);
          assert.fail('this function should not throw');
          done();
        }
      });

    });

    it("should call payout", function(done) {
      splittercontract.payout({
          from: accounts[0]
        })
        .then(function() {
          done();
        })
        .catch(function(e) {
          assert.fail('this should not throw',e);
          done();
        });
    });

    it("splitter should be empty", function(done) {
      assert.equal(0,self.web3.eth.getBalance(splittercontract.address).toNumber());
      done();
    });

    it("should have increased balances on payout accounts", function(done) {

        console.log('1=',self.web3.eth.getBalance(accounts[1]).toNumber());
        console.log('2=',self.web3.eth.getBalance(accounts[2]).toNumber());
        console.log('3=',self.web3.eth.getBalance(accounts[3]).toNumber());
        console.log('4=',self.web3.eth.getBalance(accounts[4]).toNumber());

      assert.equal(balances[1]+ 1e18 / 4, self.web3.eth.getBalance(accounts[1]).toNumber());
      done();
    });
  });
});