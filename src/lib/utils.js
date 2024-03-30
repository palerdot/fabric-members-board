import { isEmpty, isNil } from "lodash-es"

export function filter_profiles(search_term, all_profiles) {
  if (isNil(search_term) || isEmpty(search_term)) {
    return all_profiles
  }

  return all_profiles.filter(profile => profile.name.includes(search_term))
}
