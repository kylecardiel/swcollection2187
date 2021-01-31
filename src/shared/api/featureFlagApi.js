import { read } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { FEATURE_FLAG } = FB_DB_CONSTANTS;

export class FeatureFlagApi {
    static read = () => read(FEATURE_FLAG);
}