import { Movie } from "./definitions";

function euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(a.reduce((sum, val, idx) => sum + (val - b[idx]) ** 2, 0));
}

export function kMeanClustering(movies: Movie[], k: number): Movie[][] {
    const centroids = movies.slice(0, k).map((movie) => movie.features);
    let clusters: Movie[][] = Array.from({ length: k }, () => []);

    let changed = true;
    while (changed) {
        clusters = Array.from({ length: k }, () => []);

        movies.forEach((movie) => {
            let minDist = Infinity;
            let bestCluster = 0;

            centroids.forEach((centroid, i) => {
                const dist = euclideanDistance(movie.features, centroid);
                if (dist < minDist) {
                    minDist = dist;
                    bestCluster = i;
                }
            });

            clusters[bestCluster].push(movie);
        });

        const newCentroids = clusters.map((cluster) =>
            cluster.reduce(
                (acc, movie) => acc.map((val, idx) => val + movie.features[idx] / cluster.length),
                Array(movies[0].features.length).fill(0)
            )
        );

        changed = !centroids.every((c, i) => c.every((val, idx) => val === newCentroids[i][idx]));
        centroids.splice(0, centroids.length, ...newCentroids);
    }

    return clusters;
}

export function getRecommendations(movies: Movie[], userMovie: Movie, k: number = 3): Movie[] {
    const clusters = kMeanClustering(movies, k);
    const userCluster = clusters.find((cluster) => cluster.includes(userMovie)) || [];
    return userCluster.filter((m) => m.id !== userMovie.id).slice(0, 5);
}