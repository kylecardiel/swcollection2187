import camelCase from 'lodash/camelCase';
import { SortingUtils } from 'shared/util/sortingUtil';
import { RecordUtils } from 'shared/util/recordUtils';
import { isProduction } from 'shared/util/environment';
import { onValue } from 'firebase/database';
import { CatalogApi } from 'shared/api/catalogApi';
import { UserApi } from 'shared/api/userApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import catalogDataFile from 'shared/fixtures/catalogData.json';
import userDataFile from 'shared/fixtures/userData.json';

export class VideoGameHelper {
    static getOtherGamesInSeries = (completeGameList, specificGame) => {
        return SortingUtils.sortDataByStringIntAsc(completeGameList.filter(el => specificGame.videoGameSeries && el.videoGameSeries === specificGame.videoGameSeries && el.id !== specificGame.id), 'year');
    };

    static getCatalog = (isVideoGameListLoaded, loggedIn, id, setVideoGameData, setUserData) => {
        const { VIDEO_GAMES } = FB_DB_CONSTANTS;
        if(isProduction) {
            if(!isVideoGameListLoaded){
                const catalogRef = CatalogApi.read(VIDEO_GAMES);
                onValue(catalogRef, snapshot => {
                    const snapshotValue = snapshot.val();
                    if (snapshotValue) {
                        setVideoGameData(RecordUtils.formatById(snapshotValue));
                    }
                });
            }

            if (loggedIn) {
                const userRef = UserApi.read(id, VIDEO_GAMES);
                onValue(userRef, snapshot => {
                    const snapshotValue = snapshot.val();
                    if (snapshotValue) {
                        setUserData(RecordUtils.formatByOwnedId(snapshotValue));
                    }
                });
            }
        } else {
            const { CatalogData } = catalogDataFile;
            const { usersData } = userDataFile;

            if(!isVideoGameListLoaded){
                setVideoGameData(RecordUtils.formatById(CatalogData.VideoGames));
                setUserData(RecordUtils.formatByOwnedId(usersData.VideoGames));
            }
        }
    };

    static filterCatalog = (completeGameList, userList, fitlerCriteria, filterByMyCollection) => {
        let mergedList = VideoGameHelper.mergeCatalogWithUserData(completeGameList, userList);
        mergedList = filterByMyCollection ? mergedList.filter(el => el.owned === true) : mergedList;
        SortingUtils.sortDataByAttributeDesc(mergedList, 'year');

        for (const [key, value] of Object.entries(fitlerCriteria)) {
            if (value) {
                switch(key) {
                case 'search':
                    mergedList = mergedList.filter(el => {
                        return el.name.toLowerCase().includes(value.toLowerCase())
                            || (el.videoGameSeries && el.videoGameSeries.toLowerCase().includes(value.toLowerCase()));
                    });
                    break;
                case 'videoGameConsole':
                    mergedList = mergedList.filter(el => el[key].includes(value));
                    break;
                case 'sorting':
                    SortingUtils.sortDataByAttributeAsc(mergedList, camelCase(fitlerCriteria['sorting']));
                    break;
                default:
                    mergedList = mergedList.filter(el => el[key] === value);
                    break;
                }
            } else {
                continue;
            }
        } 
        return mergedList;
    };

    static mergeCatalogWithUserData = (completeGameList, userList) => {
        return completeGameList && userList ? RecordUtils.mergeTwoArraysByAttribute(completeGameList, 'id', userList, 'catalogId') : completeGameList;
    };
}
