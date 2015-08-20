var p = {
	balance: 0,
	rate: 0,
	months: 0,
	dataIn(bal, rate, months) {
		p.balance = Number(bal);
		p.rate = Number(rate);
		p.months = Number(months);

	}
};