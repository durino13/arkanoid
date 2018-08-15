export class LevelLoader {

    readLevelDefinition(level: number) {

        return fetch('resources/level_' + level +'.json')
            .then((response) => {
                return response.json();
            });

    }

}