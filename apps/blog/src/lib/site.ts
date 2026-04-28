import type { GiscusProps } from '@giscus/react'
import type { SocialSite } from '@/lib/social'
import type { GitHub } from '@/types'
import { colors } from '@/lib/colors'

interface SiteConfig {
  author: string
  email: string
  themeColor: string
  url: string
  socials: Record<SocialSite, string>
  maxLandingStars: number
  minRepoStars: number
  contentPath: string
  githubData: GitHub
  giscus?: GiscusProps
}

const siteConfig: SiteConfig = {
  author: 'New World Kids',
  email: 'team@newworldkids.org',
  themeColor: colors.black,
  url: 'https://newworldkids.org/blog',
  socials: {
    github: 'executiveusa',
    x: 'newworldkids',
    facebook: 'newworldkids',
    weibo: 'newworldkids',
    rss: 'newworldkids',
  },
  maxLandingStars: 0,
  minRepoStars: 0,
  contentPath: 'content',
  githubData: {
    profile: {
      username: 'executiveusa',
      name: 'New World Kids',
      avatar: 'https://avatars.githubusercontent.com/u/202058691?v=4',
      bio: 'Food, water, energy, and shelter field reporting',
      location: 'Puerto Vallarta / Seattle',
      url: 'https://github.com/executiveusa',
      followers: 0,
      followersUrl: 'https://github.com/executiveusa?tab=followers',
      following: 0,
      followingUrl: 'https://github.com/executiveusa?tab=following',
      publicRepos: 0,
      publicGists: 0,
      totalStars: 0,
      createDate: '2026-01-01',
    },
    repos: [],
  },
}

export { siteConfig }
export type { SiteConfig }
