const ACTIVITIES = {
  manufacturer: 'fabricant',
  publisher: 'éditeur',
  developer: 'développeur',
  distributor: 'distributeur',
  retailer: 'détaillant',
  other: 'autre',
  association: 'association',
}

export function getActivities(activities = '') {
  if (!activities) return []
  return activities.split(',').map((activity) => ACTIVITIES[activity.trim()])
}
