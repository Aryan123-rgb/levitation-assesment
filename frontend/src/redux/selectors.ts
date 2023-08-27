import { RootState } from './store';

export const selectUserDetails = (state: RootState) => state.userDetails.userDetails;
export const selectUploadedFiles = (state: RootState) => state.dropZone.files;
export const selectSelectedOptions = (state:RootState) => state.userChoice.selectedOptions;
export const selectedActiveSection = (state:RootState) => state.activeSection.currentSection
