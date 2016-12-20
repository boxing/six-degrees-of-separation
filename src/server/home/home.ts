import {DijkstraConstructor, StringMap} from "../../lib/dijkstra.interface";
const express = require("express");
const router = express.Router();

interface Boxer {
    id: number;
    boxrec_id: number;
    name: string;
}

interface Bouts {
    boxer1_id: number;
    boxer2_id: number;
}

const Graph: DijkstraConstructor = require("../../lib/dijkstra");

import {sequelize as Sequelize} from "../../database/sequelize";

router.get("/home", async (req: any, res: any) => {

    let boxers: Boxer[], bouts: Bouts[];

    if (!req.query.boxers) {
        // todo proper fail
        res.send("need query string with boxers separated, ex. `?boxers=352,642464`");
        throw new Error("did not give have `boxers` in query string");
    }

    const boxersSplit: string[] = req.query.boxers.split(",");

    if (boxersSplit.length !== 2) { // can only support 2
        res.send("can only support 2 boxers at this time");
        throw new Error("need boxers comma separated, can only support 2 at a time");
    }

    try {
        boxers = await Sequelize.query("SELECT * FROM boxers", {type: Sequelize.QueryTypes.SELECT});
    } catch (e) {
        throw new Error(e);
    }

    try {
        bouts = await Sequelize.query("SELECT * FROM bouts", {type: Sequelize.QueryTypes.SELECT});
    } catch (e) {
        throw new Error(e);
    }

    const boxersArr: number[] = boxersSplit.map((item: string) => parseInt(item, 10));

    let map: StringMap = {};
    for (let i in bouts) {
        if (bouts.hasOwnProperty(i)) {

            let item = (map as any);

            if (!item[bouts[i].boxer1_id]) {
                item[bouts[i].boxer1_id] = {};
            }

            item[bouts[i].boxer1_id][bouts[i].boxer2_id] = 1;
        }
    }

    const graph = new Graph(map);
    const result: any = graph.findShortestPath(...boxersArr);

    if (result) {
        const newResult: Boxer[] = result.map((id: string) => {
            const parsedId: number = parseInt(id, 10);
            return {
                id: parsedId,
                name: boxers.find((item: Boxer) => item.boxrec_id === parsedId).name,
            };
        });

        res.send(newResult);

    } else {
        res.send("Did not find link between boxers");
    }

});

module.exports = router;
