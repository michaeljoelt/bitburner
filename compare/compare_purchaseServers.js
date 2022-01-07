/** @param {NS} ns **/
/*
Name: purchaseServers.js 
Last updated: 2022-01-02-1741
*/
export async function main(ns) {
    let script = "autoHack.js";
    // How much RAM each purchased server will have. In this case, it'll
    // be 8GB.
    let ram = 8;
 
    // Iterator we'll use for our loop
 
    let purchaseLimit = ns.getPurchasedServerLimit();
    ns.tprint("purchased server limit: " + purchaseLimit);
    let allServers = ns.scan();
 
    let serverCount = 0;
    //let targets = []
    //ns.tprint("length: "+targets.length)
    for (let i = 0; i < allServers.length; i++) {
        let server = allServers[i];
        //ns.tprint("servername "+server);
        if (server.startsWith("pserv")) {
            ++serverCount;
        }
        //else{
        // targets = targets +" "+ server;
        //}
        ns.tprint("servers owned: " + serverCount);
        //   ns.tprint("targets: "+ targets);
    }
 
 
    ns.tprint("servers owned: " + serverCount);
 
    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (serverCount < purchaseLimit) {
        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") / 2 > ns.getPurchasedServerCost(ram)) {
            ns.print(ns.getServerMoneyAvailable("home") / 2 + ">" + ns.getPurchasedServerCost(ram));
            // If we have enough money, then:
            //  1. Purchase the server
            //  2. Copy our hacking script onto the newly-purchased server
            //  3. Run our hacking script on the newly-purchased server with 3 threads
            //  4. Increment our iterator to indicate that we've bought a new server
            let hostname = ns.purchaseServer("pserv-" + serverCount, ram);
            ns.print("purchased " + hostname);
            await ns.scp(script, hostname);
            //    await ns.scp("copyRun_autoHack.js", hostname);
            //ns.exec("copyRun_autoHack.js " + targets, hostname, 1);
            ns.exec(script, hostname, 1, "joesguns");
            ++serverCount;
        }
        await ns.sleep(1000);
    }
 
    // Continuously try to upgrade servers 
    allServers = ns.scan();
    let myServers = [];
    for (let i = 0; i < allServers.length; i++) {
        let server = allServers[i];
        if (server.startsWith("pserv")) {
            myServers.push(server);
        }
    }
 
    ns.tprint("checking servers for upgrades: " + myServers);
    let maxRam = ns.getPurchasedServerMaxRam();
 
    for (let i = 0; i < myServers.length; i++) {
        let server = myServers[i];
        let upgradedServer = 0;
        ns.tprint("current server = " + server);
 
        let serverSize = ns.getServerMaxRam(server);
        ns.tprint("serverSize = " + serverSize);
        let myMoney = ns.getServerMoneyAvailable("home");
        ns.tprint("myMoney = " + myMoney);
        for (ram = maxRam; ram > serverSize; ram = ram / 2) {
            if ((myMoney / 2) > ns.getPurchasedServerCost(ram)) {
                ns.tprint("cost of server with ram " + ram + ": " + ns.getPurchasedServerCost(ram));
                ns.tprint((myMoney / 2) + " > " + ns.getPurchasedServerCost(ram));
                // let killed = false;
                // while (killed != true) {
                //     killed = ns.killall(server);
                //     //await ns.sleep(500000);
                // }
                ns.killall(server);
                await ns.sleep(10000);
                ns.deleteServer(server);
                ns.purchaseServer(server, ram);
                ns.tprint(server + " upgraded from " + serverSize + " to " + ram);
                await ns.scp(script, server);
                ns.exec(script, server, ns.getServerMaxRam(server) / 3, "joesguns");
                upgradedServer = 1;
                break;
            }
        }
 
        if (upgradedServer != 1) {
            ns.tprint("cannot afford upgrading " + server + " (current RAM: " + serverSize + " current money: " + myMoney + " next upgrade cost" + "(for " + serverSize * 2 + "ram)" + ": " + ns.getPurchasedServerCost(serverSize * 2));
        }
 
        // if (upgradedServer == 1) {
        //     let killed = false;
        //     while (killed != true) {
        //         killed = ns.killall(server);
        //         ns.killall(server);
        //         await ns.sleep(500000);
        //     }
 
    }
    await ns.sleep(1000);
}