import { GameMode, system } from "@minecraft/server";
import { FormCancelationReason } from "@minecraft/server-ui";
function stackDistribution(number, groupSize = 64) {
    const fullGroupsCount = Math.floor(number / groupSize);
    const remainder = number % groupSize;
    const groups = new Array(fullGroupsCount).fill(groupSize);
    if (remainder > 0) {
        groups.push(remainder);
    }
    return groups;
}
function isGameModeSurvival(player) {
    return player.dimension.getPlayers({ gameMode: GameMode.survival, name: player.name, location: player.location, maxDistance: 1, closest: 1 }).length > 0;
}
async function forceShow(player, form, timeout = Infinity) {
    const startTick = system.currentTick;
    while ((system.currentTick - startTick) < timeout) {
        const response = await (form.show(player)).catch(er => console.error(er, er.stack));
        if (response.cancelationReason !== FormCancelationReason.UserBusy) {
            return response;
        }
    }
    ;
    throw new Error(`Timed out after ${timeout} ticks`);
}
export { isGameModeSurvival, stackDistribution, forceShow };
