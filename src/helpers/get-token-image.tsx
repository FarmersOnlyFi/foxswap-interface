import TimeImg from "../assets/svg/foxswap/fox-coins.svg";
import MemoImg from "../assets/svg/foxswap/fox-coins.svg";

function toUrl(tokenPath: string): string {
    const host = window.location.origin;
    return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {
    if (name === "time") {
        return toUrl(TimeImg);
    }

    if (name === "memo") {
        return toUrl(MemoImg);
    }

    throw Error(`Token url doesn't support: ${name}`);
}
