/** @param {NS} ns **/
/*
Name: purchaseHacknet.js 
Last updated: 2022-01-06-2200
*/
export async function main(ns) {
    if (ns.getServerMoneyAvailable("home") / 2 > ns.getPurchasedServerCost(ram)) {
        ns.print(ns.getServerMoneyAvailable("home") / 2 + ">" + ns.getPurchasedServerCost(ram));
}