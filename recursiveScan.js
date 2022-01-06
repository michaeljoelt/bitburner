/** @param {NS} ns **/
/*
Name: recursiveScan.js 
Last updated: 2022-01-03-0235

args -> 
all = returns all servers (also if you put no argument)
rootTrue = returns servers with root access
rootFalse = returns servers without root access
ports0 = returns servers with port 0 (change to 1-5 for the others)
hackableLevelTrue = returns servers with lower hack level than players current level
hackableLevelFalse = returns servers with higher hack level than players current level

to add later?: hackableTrue; hackable false - based on everything (ports, level, root)

*/
/*recursive code credit: milonti on reddit https://www.reddit.com/r/Bitburner/comments/9uuh3u/recursive_variables/ */
//let arg = "all";
export async function main(ns) {
	let arg = ns.args[0]; //custom
	ns.tprint("returning based on arg: " + arg + "(to return all servers if blank)"); //custom
	let scanned = [];
	const uniqueSet = new Set(); //custom
	const returnArray = [];
	async function recursive(host) {
		scanned.push(host);
		let newScan = ns.scan(host); //custom

		for (let x = 0; x < newScan.length; x++) {

			if (scanned.includes(newScan[x])) continue;
			//Insert recursing code below
			if (arg == "rootFalse" && ns.hasRootAccess(host) == false) {
				ns.tprint("assumedArg" + "rootFalse ; " + "server:" + host + " ; maxMoney:" + ns.getServerMaxMoney(host) + " ; maxRam:" + ns.getServerMaxRam(host) + " ; portsRequired:" + ns.getServerNumPortsRequired(host) + " ; requiredHackingLvl:" + ns.getServerRequiredHackingLevel(host) + " ; rootAccess:" + ns.hasRootAccess(host));
				//returnArray.push(server);
				uniqueSet.add(host);
			}
			else if (arg == "rootTrue" && ns.hasRootAccess(host) == true) {
				ns.tprint("assumedArg" + "rootTrue ; " + "server:" + host + " ; maxMoney:" + ns.getServerMaxMoney(host) + " ; maxRam:" + ns.getServerMaxRam(host) + " ; portsRequired:" + ns.getServerNumPortsRequired(host) + " ; requiredHackingLvl:" + ns.getServerRequiredHackingLevel(host) + " ; rootAccess:" + ns.hasRootAccess(host));
				uniqueSet.add(host);
			}
			else if (arg == "ports0" && ns.getServerNumPortsRequired(host) == 0) {
				ns.tprint("assumedArg" + "ports0 ; " + "server:" + host + " ; maxMoney:" + ns.getServerMaxMoney(host) + " ; maxRam:" + ns.getServerMaxRam(host) + " ; portsRequired:" + ns.getServerNumPortsRequired(host) + " ; requiredHackingLvl:" + ns.getServerRequiredHackingLevel(host) + " ; rootAccess:" + ns.hasRootAccess(host));
				uniqueSet.add(host);
			}
			else if (arg == "ports1" && ns.getServerNumPortsRequired(host) == 1) {
				ns.tprint("assumedArg" + "ports1 ; " + "server:" + host + " ; maxMoney:" + ns.getServerMaxMoney(host) + " ; maxRam:" + ns.getServerMaxRam(host) + " ; portsRequired:" + ns.getServerNumPortsRequired(host) + " ; requiredHackingLvl:" + ns.getServerRequiredHackingLevel(host) + " ; rootAccess:" + ns.hasRootAccess(host));
				uniqueSet.add(host);
			}
			else if (arg == "ports2" && ns.getServerNumPortsRequired(host) == 2) {
				ns.tprint("assumedArg" + "ports2 ; " + "server:" + host + " ; maxMoney:" + ns.getServerMaxMoney(host) + " ; maxRam:" + ns.getServerMaxRam(host) + " ; portsRequired:" + ns.getServerNumPortsRequired(host) + " ; requiredHackingLvl:" + ns.getServerRequiredHackingLevel(host) + " ; rootAccess:" + ns.hasRootAccess(host));
				uniqueSet.add(host);
			}
			else if (arg == "ports3" && ns.getServerNumPortsRequired(host) == 3) {
				ns.tprint("assumedArg" + "ports3 ; " + "server:" + host + " ; maxMoney:" + ns.getServerMaxMoney(host) + " ; maxRam:" + ns.getServerMaxRam(host) + " ; portsRequired:" + ns.getServerNumPortsRequired(host) + " ; requiredHackingLvl:" + ns.getServerRequiredHackingLevel(host) + " ; rootAccess:" + ns.hasRootAccess(host));
				uniqueSet.add(host);
			}
			else if (arg == "ports4" && ns.getServerNumPortsRequired(host) == 4) {
				ns.tprint("assumedArg" + "ports4 ; " + "server:" + host + " ; maxMoney:" + ns.getServerMaxMoney(host) + " ; maxRam:" + ns.getServerMaxRam(host) + " ; portsRequired:" + ns.getServerNumPortsRequired(host) + " ; requiredHackingLvl:" + ns.getServerRequiredHackingLevel(host) + " ; rootAccess:" + ns.hasRootAccess(host));
				uniqueSet.add(host);
			}
			else if (arg == "ports5" && ns.getServerNumPortsRequired(host) == 5) {
				ns.tprint("assumedArg" + "ports5 ; " + "server:" + host + " ; maxMoney:" + ns.getServerMaxMoney(host) + " ; maxRam:" + ns.getServerMaxRam(host) + " ; portsRequired:" + ns.getServerNumPortsRequired(host) + " ; requiredHackingLvl:" + ns.getServerRequiredHackingLevel(host) + " ; rootAccess:" + ns.hasRootAccess(host));
				uniqueSet.add(host);
			}
			else {
				ns.tprint("assumedArg" + "none or all ; " + "server:" + host + " ; maxMoney:" + ns.getServerMaxMoney(host) + " ; maxRam:" + ns.getServerMaxRam(host) + " ; portsRequired:" + ns.getServerNumPortsRequired(host) + " ; requiredHackingLvl:" + ns.getServerRequiredHackingLevel(host) + " ; rootAccess:" + ns.hasRootAccess(host));
				uniqueSet.add(host);
			}



			// if (ns.getServerMaxMoney(host) > 0) {
			// 	//ns.tprint("server: " + host + " ; maxMoney: " + ns.getServerMaxMoney(host));
			// 	uniqueSet.add(host);
			// }
			//Insert recursing code above
			await recursive(newScan[x]);
		}
	}
	await recursive('home');

	/* also custom code */
	uniqueSet.forEach(function (server) {
	//ns.tprint(server);
		returnArray.push(server);
	//return based on argument
	//rootTrue,rootFalse,ports0,hackableTrue,hackableFalse

	});
	ns.tprint("TO RETURN ARRAY: " + returnArray);
	return returnArray;
	/* custom code end */
}