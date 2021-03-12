import { read } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { ABOUT_ME } = FB_DB_CONSTANTS;

export class AboutMeApi {
    static read = () => read(ABOUT_ME);
}