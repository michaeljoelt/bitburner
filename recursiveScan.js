/** @param {NS} ns **/
/* 
Last updated: 1/2/2022 2:15
*/
/*recursive code template credit: milonti on reddit https://www.reddit.com/r/Bitburner/comments/9uuh3u/recursive_variables/ */
export async function main(ns) {
	let scanned = [];
	function recursive(host) {
		scanned.push(host);
		let newScan = ns.scan(host);
		for (let x = 0; x < newScan.length; x++) {
			if (scanned.includes(newScan[x])) continue;
			//Insert recursing code below
			if (ns.getServerMaxMoney(host) > 0) {
				ns.tprint("server: " + host + " ; maxMoney: " + ns.getServerMaxMoney(host));
			}
			//Insert recursing code above
			recursive(newScan[x])
		}
	}
	recursive('home');
}
