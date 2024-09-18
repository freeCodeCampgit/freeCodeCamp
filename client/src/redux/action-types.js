import { createTypes, createAsyncTypes } from '../utils/create-types';

export const ns = 'app';

export const actionTypes = createTypes(
  [
    'appMount',
    'hardGoTo',
    'allowBlockDonationRequests',
    'setRenderStartTime',
    'preventBlockDonationRequests',
    'setIsRandomCompletionThreshold',
    'openDonationModal',
    'closeDonationModal',
    'openSignoutModal',
    'closeSignoutModal',
    'onlineStatusChange',
    'serverStatusChange',
    'resetUserData',
    'tryToShowDonationModal',
    'startExam',
    'stopExam',
    'clearExamResults',
    'linkMsUsername',
    'unlinkMsUsername',
    'setMsUsername',
    'setIsProcessing',
    'submitComplete',
    'submitSurvey',
    'submitSurveyComplete',
    'updateComplete',
    'updateFailed',
    'updateDonationFormState',
    'updateUserToken',
    'postChargeProcessing',
    'updateAllChallengesInfo',
    'updateCardRedirecting',
    ...createAsyncTypes('updateCard'),
    ...createAsyncTypes('fetchUser'),
    ...createAsyncTypes('postCharge'),
    ...createAsyncTypes('fetchProfileForUser'),
    ...createAsyncTypes('acceptTerms'),
    ...createAsyncTypes('showCert'),
    ...createAsyncTypes('reportUser'),
    ...createAsyncTypes('deleteUserToken'),
    ...createAsyncTypes('saveChallenge')
  ],
  ns
);
