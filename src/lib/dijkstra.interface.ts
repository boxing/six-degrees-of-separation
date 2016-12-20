export interface StringMap { [s: string]: string; }

interface Dijkstra {
    findShortestPath: (...boxers: number[]) => any;
}

export interface DijkstraConstructor {
    new(map: StringMap): Dijkstra;
}
