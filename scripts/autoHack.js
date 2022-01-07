/** @param {NS} ns **/
/* 
Name: autoHack.js
Last updated: 2022-01-06-2200
*/
export async function main(ns) {
	let moneyThresh = 1000000;
	let vers = "v1";
	let host = ns.getHostname();
	let target = host;
	if (ns.args.length > 0) {
		target = ns.args[0];
	}
	ns.print(vers + "|" + host + "|" + Date.now() + ": target: " + target);

	let myMoney = ns.getServerMoneyAvailable("home");
	let serverThresh = ns.getServerMaxMoney(target) * 0.75;
	if(myMoney < moneyThresh)
	{
		moneyThresh = myMoney;
	}
	else if(myMoney > serverThresh)
	{
		moneyThresh = serverThresh;
	}
	ns.print(vers + "|" + host + "|" + Date.now() + ": moneyTresh: " + moneyThresh);
	let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
	ns.print(vers + "|" + host + "|" + Date.now() + ": securityThresh: " + securityThresh);

	while (true) {
		ns.print(vers + "|" + host + "|" + Date.now() + ": target: " + target + "; $" + ns.getServerMoneyAvailable(target) + " ; security: " + ns.getServerMinSecurityLevel(target));
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			ns.print(vers + "|" + host + "|" + Date.now() + ": security level (" + ns.getServerSecurityLevel(target) + ") > securityThresh(" + securityThresh + ")");
			ns.print(vers + "|" + host + "|" + Date.now() + ": running weaken");
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			ns.print(vers + "|" + host + "|" + Date.now() + ": money available (" + ns.getServerMoneyAvailable(target) + ") < moneyThresh(" + moneyThresh + ")");
			ns.print(vers + "|" + host + "|" + Date.now() + ": grow " + target);
			await ns.grow(target);
		} else {
			ns.print(vers + "|" + host + "|" + Date.now() + ": hacking " + target + "($" + ns.getServerMoneyAvailable(target) + ")");
			await ns.hack(target);
		}
	}
}
