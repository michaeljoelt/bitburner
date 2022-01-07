/** @param {NS} ns **/
/*
Name: startup.js 
Last updated: 2022-01-03-0235
*/
export async function main(ns) {
    let script = "autoHack.js"; //to run early on (targetting joesguns) while purchasing each server
    let postScript = "updateServerScripts.js"; //to run after complete purchases/upgrades
    let targets = [];
    let earlyGame = true;


    // Start other scripts
    ns.exec("purchase-server-8gb", "home", 1);

    // Array of all servers that don't need any ports opened
    // to gain root access. These have 16 GB of RAM
    let servers0Port = ["joesguns", "n00dles", "foodnstuff", "sigma-cosmetics", "nectar-net", "hong-fang-tea", "harakiri-sushi"];

    // Array of all servers that only need 1 port opened
    // to gain root access. These have 32 GB of RAM
    let servers1Port = ["neo-net", "zer0", "max-hardware", "iron-gym", "CSEC"];
    let servers2Port = ["omega-net", "silver-helix", "phantasy", "crush-fitness", "the-hub", "avmnite-02h", "johnson-ortho"];
    let servers3Port = ["netlink", "catalyst", "comptek", "summit-uni", "rothman-uni", "millenium-fitness", "I.I.I.I", "rho-construction"];
    let servers4Port = ["syscore", "lexo-corp", "aevum-police", "zb-def", "nova-med", "unitalife", "univ-energy", "alpha-ent", "global-pharm", "snap-fitness"];
    let servers5Port = ["zb-institute", "galactic-cyber", "omnia", "icarus", "taiyang-digital", "zeus-med", "infocomm", "aerocorp", "defcomm", "solaris", "deltaone"];

    // Copy our scripts onto each server that requires 0 ports
    // to gain root access. Then use nuke() to gain admin access and
    // run the scripts.
    if(earlyGame == true){
        targets = [];
    }
    for (let i = 0; i < servers0Port.length; ++i) {
        let serv = servers0Port[i];
        //targets.push(serv);
        targets = targets + " " + serv;

        await ns.scp(script, serv);
        ns.nuke(serv);
        ns.exec(script, serv, 6);
    }

    // Wait until we acquire the "BruteSSH.exe" program
    while (!ns.fileExists("BruteSSH.exe")) {
        await ns.sleep(60000);
    }

    // Copy our scripts onto each server that requires 1 port
    // to gain root access. Then use brutessh() and nuke()
    // to gain admin access and run the scripts.
    if(earlyGame == true){
        targets = [];
    }
    for (let i = 0; i < servers1Port.length; ++i) {
        let serv = servers1Port[i];
        //targets.push(serv);
        targets = targets + " " + serv;

        await ns.scp(script, serv);
        ns.brutessh(serv);
        ns.nuke(serv);
        ns.exec(script, serv, 12);
    }
    ns.exec(postScript, "home", 1, targets);

    // Wait until we acquire the "BruteSSH.exe" program
    while (!ns.fileExists("FTPCrack.exe")) {
        await ns.sleep(60000);
    }



    // Copy our scripts onto each server that requires 2 port
    // to gain root access. Then use ftpcrack(), brutessh() and nuke()
    // to gain admin access and run the scripts.
    if(earlyGame == true){
        targets = [];
    }
    for (let i = 0; i < servers2Port.length; ++i) {
        let serv = servers2Port[i];
        //targets.push(serv);
        targets = targets + " " + serv;

        await ns.scp(script, serv);
        ns.ftpcrack(serv);
        ns.brutessh(serv);
        ns.nuke(serv);
        ns.exec(script, serv, 12);
    }
    ns.exec(postScript, "home", 1, targets);


    // Wait until we acquire the "BruteSSH.exe" program
    while (!ns.fileExists("relaySMTP.exe")) {
        await ns.sleep(60000);
    }


    // Copy our scripts onto each server that requires 3 port
    if(earlyGame == true){
        targets = [];
    }
    for (let i = 0; i < servers3Port.length; ++i) {
        let serv = servers3Port[i];
        targets = targets + " " + serv;

        await ns.scp(script, serv);
        ns.ftpcrack(serv);
        ns.brutessh(serv);
        ns.relaysmtp(serv);
        ns.nuke(serv);
        ns.exec(script, serv, 12);
    }
    ns.exec(postScript, "home", 1, targets);

    // Wait until we acquire the "BruteSSH.exe" program
    while (!ns.fileExists("HTTPWorm.exe")) {
        await ns.sleep(60000);
    }

    // Copy our scripts onto each server that requires 4 port
    if(earlyGame == true){
        targets = [];
    }
    for (let i = 0; i < servers4Port.length; ++i) {
        let serv = servers4Port[i];
        targets = targets + " " + serv;

        await ns.scp(script, serv);
        ns.ftpcrack(serv);
        ns.brutessh(serv);
        ns.relaysmtp(serv);
        ns.httpworm(serv);
        ns.nuke(serv);
        //ns.kill(postScript + " " + serv);
        ns.exec(script, serv, 12);
    }

    ns.exec(postScript, "home", 1, targets);

}