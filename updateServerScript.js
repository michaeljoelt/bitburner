/** @param {NS} ns **/
/* 
Name: updateServerScripts.js 
Last updated: 2022-01-06-1817

Description: 
- set ups autoHack.js on each purchased server (if they start with "pserv")
- without arguments, just hacks joesguns. otherwise hacks each argument/server
- use run startup.js to automatically determine which servers to hack (run updateServerScripts within it)
*/
export async function main(ns) {

	let script = "autoHack.js";
	let scriptRam = ns.getScriptRam(script);
	let targets = ["joesguns"];

	if (ns.args.length > 0) {
		let arg = ns.args + "";
		let potentialTargets = arg.split(" ");
		targets = [];
		for (let i = 0; i < potentialTargets.length; i++) {
			if (serverExists(potentialTargets[i]) && ns.hasRootAccess(potentialTargets[i]) && (ns.getServerRequiredHackingLevel(potentialTargets[i]) <= ns.getHackingLevel())) {
				targets.push(servers[i]);
			}
		}
	}

	let allServers = ns.scan();
	let myServers = [];


	for (let i = 0; i < allServers.length; i++) {
		let server = allServers[i];

		if (server.startsWith("pserv")) {
			myServers.push(server);
		}
	}


	ns.tprint("targets = " + targets);
	ns.tprint("my servers = " + myServers);

	for (let i = 0; i < myServers.length; i++) {
		let server = myServers[i];
		ns.tprint("current server = " + server);
		ns.killall(server);
		await ns.sleep(10000);
		let freeRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
		let threads = Math.floor(freeRam / scriptRam / targets.length);
		if (threads < 1) { threads = 1; }
		ns.tprint("freeRam:" + freeRam + " ; scriptRam:" + scriptRam + " ; threads to use:" + threads);
		await ns.scp(script, "home", server);
		for (let c = 0; c < targets.length; c++) {
			let target = targets[c];
			if (!target == " ") {
				ns.tprint("Running " + script + " " + target + " on " + server + "with " + threads + " threads");
				ns.exec(script, server, threads, target);
			}
		}
		await ns.sleep(1000)
	}
	await ns.sleep(100000)
}
