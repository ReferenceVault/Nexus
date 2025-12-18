// Onboarding status management utility

const ONBOARDING_KEY = 'nexus_onboarding_status'

export const OnboardingStatus = {
  NOT_STARTED: 'not_started',
  BASIC_INFO: 'basic_info', // Step 1 completed
  RESUME_UPLOADED: 'resume_uploaded', // Step 2 completed
  VIDEO_UPLOADED: 'video_uploaded', // Step 3 completed
  COMPLETED: 'completed' // All steps done
}

/**
 * Get current onboarding status
 */
export const getOnboardingStatus = () => {
  const status = localStorage.getItem(ONBOARDING_KEY)
  return status || OnboardingStatus.NOT_STARTED
}

/**
 * Set onboarding status
 */
export const setOnboardingStatus = (status) => {
  localStorage.setItem(ONBOARDING_KEY, status)
}

/**
 * Check if user is a first-time user
 */
export const isFirstTimeUser = () => {
  const status = getOnboardingStatus()
  return status === OnboardingStatus.NOT_STARTED || status === OnboardingStatus.BASIC_INFO || status === OnboardingStatus.RESUME_UPLOADED || status === OnboardingStatus.VIDEO_UPLOADED
}

/**
 * Check if onboarding is completed
 */
export const isOnboardingComplete = () => {
  return getOnboardingStatus() === OnboardingStatus.COMPLETED
}

/**
 * Complete onboarding
 */
export const completeOnboarding = () => {
  setOnboardingStatus(OnboardingStatus.COMPLETED)
}

/**
 * Reset onboarding (for testing/logout)
 */
export const resetOnboarding = () => {
  localStorage.removeItem(ONBOARDING_KEY)
}

