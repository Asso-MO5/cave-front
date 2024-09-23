import { ACTIVITIES_COMPANY } from './constants'

export function getActivities(activities = '') {
  if (!activities) return []
  return activities
    .split(',')
    .map((activity) => ACTIVITIES_COMPANY[activity.trim()])
}
