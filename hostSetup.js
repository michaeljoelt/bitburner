/** @param {NS} ns **/
/* 
script: hostsetup.js
last updated: 2022-01-05-0128
*/
export async function main(ns) {
	let host = "home";
	if (ns.args.length > 0) {
		host = ns.args[0];
		await ns.scp("autoHack.js", "home", host);
	}
	let servers0Port = ["joesguns", "n00dles", "foodnstuff", "sigma-cosmetics", "nectar-net", "hong-fang-tea", "harakiri-sushi"];
	let servers1Port = ["neo-net", "zer0", "max-hardware", "iron-gym", "CSEC"];
	let servers2Port = ["omega-net", "silver-helix", "phantasy", "crush-fitness", "the-hub", "avmnite-02h", "johnson-ortho"];
	let servers3Port = ["netlink", "catalyst", "comptek", "summit-uni", "rothman-uni", "millenium-fitness", "I.I.I.I", "rho-construction"];
	let servers4Port = ["syscore", "lexo-corp", "aevum-police", "zb-def", "nova-med", "unitalife", "univ-energy", "alpha-ent", "global-pharm", "snap-fitness"];
	let servers5Port = ["zb-institute", "galactic-cyber", "omnia", "icarus", "taiyang-digital", "zeus-med", "infocomm", "aerocorp", "defcomm", "solaris", "deltaone"];
	let servers = servers5Port.concat(servers4Port).concat(servers3Port).concat(servers2Port).concat(servers1Port).concat(servers0Port);
	let hackableServers = [];

	let test = ns.getScriptRam("autoHack.js");
	ns.tprint(test);

	for (let i = 0; i < servers.length; i++) {
		try {
			//if(servers[i]!=""){
			ns.exec("autoHack.js", host, 1, servers[i]);
			ns.kill("autoHack.js", host, servers[i]);
			if (ns.hasRootAccess(servers[i]) && ns.getServerRequiredHackingLevel(servers[i]) <= ns.getHackingLevel()) {
				hackableServers.push(servers[i]);
			}
		}
		catch (e) {
			ns.tprint("unhackable server discovered " + servers[i] + "error: " + e);
		}
	}

	let threads = (ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam("autoHack.js") / hackableServers.length;
	if (threads < 1) { threads = 1; }
	ns.tprint("threads for each run: " + threads);
	ns.tprint("hackable: " + hackableServers);

	for (let i = 0; i < hackableServers.length; i++) {
		try {
			ns.exec("autoHack.js", host, threads, hackableServers[i]);
		}
		catch (e) {
			ns.tprint("error attempting to hack 'hackable' server: " + hackableServers[i] + "error: " + e);
		}
	}
	await ns.sleep(30000);
}
