import { SortingUtils } from 'shared/util/sortingUtil';

export class VideoGameHelper {
    static getOtherGamesInSeries = (completeGameList, specificGame) => {
        return SortingUtils.sortDataByStringIntAsc(completeGameList.filter(el => specificGame.videoGameSeries && el.videoGameSeries === specificGame.videoGameSeries && el.id !== specificGame.id), 'year');
    };
}
