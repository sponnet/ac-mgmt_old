pragma solidity ^0.4.2;
contract splitter {
	
	address[] public targets;

	event Payout(address to,uint amount);
	event Payment(address from,uint amount);

	function splitter(address[] _targets){
		if (_targets.length == 0) throw;
		if (_targets.length > 4) throw;
		targets = _targets;
	}

	// accept funds
	function() payable{
		Payment(msg.sender,msg.value);
	}

	// payout
	function payout(){
		uint amount_each = this.balance / targets.length;
		 	Payout(0x0,this.balance);
		 for (uint i = 0; i < targets.length; i++) {
		 	if (!targets[i].send(amount_each)) throw;
		 	Payout(targets[i],amount_each);
		 }
	}

}