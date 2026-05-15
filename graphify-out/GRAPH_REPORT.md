# Graph Report - E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS\strapi-template-new-world-kids  (2026-04-30)

## Corpus Check
- 316 files · ~72,933 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 664 nodes · 562 edges · 26 communities detected
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 124 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 41|Community 41]]

## God Nodes (most connected - your core abstractions)
1. `getEnvVar()` - 22 edges
2. `removeThisWhenYouNeedMe()` - 16 edges
3. `resolveLocale()` - 12 edges
4. `getPostsMeta()` - 12 edges
5. `logNonBlockingError()` - 9 edges
6. `fetchAPI()` - 9 edges
7. `getMetadata()` - 8 edges
8. `isDevelopment()` - 7 edges
9. `fetchAndMapStrapiMetadata()` - 7 edges
10. `createStrapiAuthHeader()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `isTesting()` --calls--> `getEnvVar()`  [INFERRED]
  apps\ui\src\lib\general-helpers.ts → apps\ui\src\lib\env-vars.ts
- `generateMetadata()` --calls--> `getMetadata()`  [INFERRED]
  apps\blog\src\app\[locale]\not-found.tsx → apps\blog\src\lib\seo.ts
- `generateStaticParams()` --calls--> `getPostsMeta()`  [INFERRED]
  apps\blog\src\app\[locale]\post\[slug]\page.tsx → apps\blog\src\lib\get-posts-data.ts
- `generateStaticParams()` --calls--> `getPostsMeta()`  [INFERRED]
  apps\blog\src\app\[locale]\tag\[tagName]\page.tsx → apps\blog\src\lib\get-posts-data.ts
- `sitemap()` --calls--> `getPostsMeta()`  [INFERRED]
  apps\ui\src\app\sitemap.ts → apps\blog\src\lib\get-posts-data.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (30): AboutPage(), generateMetadata(), escapeXml(), generateRssFeed(), GET(), resolveLocale(), getBuildTime(), generatePostData() (+22 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (20): robots(), sitemap(), Layout(), getSessionCSR(), hashStringSHA256(), getEnvVar(), isProduction(), verifyRecaptcha() (+12 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (14): DashboardPage(), getSessionSSR(), throwBetterAuthError(), setupDayJs(), isTesting(), safeJSONParse(), setupLibraries(), authGuard() (+6 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (14): ChangePasswordPage(), DatePicker(), Tooltip(), ForgotPasswordPage(), AppForm(), AppFormDescription(), AppFormLabel(), removeThisWhenYouNeedMe() (+6 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (12): answerArticleQuestion(), buildArticleUi(), callGateway(), inferPillars(), rankPassages(), splitIntoPassages(), tokenize(), applyCors() (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (12): createPublicFullPath(), formatHref(), isAppLink(), getDefaultMetadata(), getDefaultOgMeta(), getDefaultTwitterMeta(), getMetaAlternates(), getMetaRobots() (+4 more)

### Community 6 - "Community 6"
Cohesion: 0.16
Nodes (8): AnchorProvider(), calcThumbPosition(), getLineOffset(), onResize(), TOCLink(), update(), useActiveAnchors(), useAnchorObserver()

### Community 7 - "Community 7"
Cohesion: 0.16
Nodes (7): MDXCode(), getSingleFileConfig(), getLanguageDisplayName(), normalizeFilepath(), parseHighlightLines(), parseLanguageFromClassName(), trimTrailingNewlines()

### Community 8 - "Community 8"
Cohesion: 0.24
Nodes (11): TailwindIndicator(), isDevelopment(), TrackingScriptWrapper(), fetchAll(), fetchAPI(), fetchMany(), fetchOne(), fetchOneByFullPath() (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.21
Nodes (10): ComponentsOverviewPage(), fetchAllPages(), fetchAllPages(), fetchFooter(), fetchNavbar(), fetchPage(), fetchSeo(), logNonBlockingError() (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.25
Nodes (4): LandingNav(), MainNav(), MobileNav(), getRoutes()

### Community 11 - "Community 11"
Cohesion: 0.36
Nodes (4): handleDrop(), handleFileInputChange(), removeSelectedFile(), setFile()

### Community 14 - "Community 14"
Cohesion: 0.33
Nodes (2): debugStaticParams(), generateStaticParams()

### Community 15 - "Community 15"
Cohesion: 0.6
Nodes (5): authDisabledResponse(), authIsConfigured(), GET(), POST(), runAuthHandler()

### Community 16 - "Community 16"
Cohesion: 0.33
Nodes (1): cn()

### Community 17 - "Community 17"
Cohesion: 0.33
Nodes (2): useTranslatedZod(), ClientProviders()

### Community 18 - "Community 18"
Cohesion: 0.5
Nodes (2): CardDescription(), cn()

### Community 20 - "Community 20"
Cohesion: 0.5
Nodes (2): Tooltip(), TooltipContent()

### Community 22 - "Community 22"
Cohesion: 0.5
Nodes (2): hrefIncludesLocale(), processLinkHrefAttribute()

### Community 24 - "Community 24"
Cohesion: 0.67
Nodes (2): Alert(), cn()

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (2): MDXAdmonition(), normalizeType()

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (2): clamp(), ProgressCircle()

### Community 33 - "Community 33"
Cohesion: 0.67
Nodes (1): cn()

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (2): getColorByName(), hashString()

### Community 35 - "Community 35"
Cohesion: 0.67
Nodes (1): Layout()

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (2): rgbDataURL(), triplet()

## Knowledge Gaps
- **Thin community `Community 14`** (6 nodes): `layout.tsx`, `build.ts`, `createFallbackPath()`, `debugStaticParams()`, `generateStaticParams()`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (6 nodes): `dropdown-menu.tsx`, `dropdown-menu.tsx`, `cn()`, `DropdownMenuPortal()`, `DropdownMenuSubTrigger()`, `DropdownMenuTrigger()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (6 nodes): `ClientProviders.tsx`, `useTranslatedZod.ts`, `resolveCustomMessage()`, `resolveSizeMessage()`, `useTranslatedZod()`, `ClientProviders()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (5 nodes): `card.tsx`, `card.tsx`, `CardDescription()`, `CardFooter()`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (5 nodes): `tooltip.tsx`, `tooltip.tsx`, `Tooltip()`, `TooltipContent()`, `TooltipProvider()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (5 nodes): `utils.ts`, `hrefIncludesLocale()`, `processLinkHrefAttribute()`, `processLinksInHtmlContent()`, `removeEmptyImagesFromContent()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (4 nodes): `alert.tsx`, `alert.tsx`, `Alert()`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (3 nodes): `mdx-admonition.tsx`, `MDXAdmonition()`, `normalizeType()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (3 nodes): `progress-circle.tsx`, `clamp()`, `ProgressCircle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (3 nodes): `dialog.tsx`, `dialog.tsx`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (3 nodes): `colors.ts`, `getColorByName()`, `hashString()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (3 nodes): `layout.tsx`, `layout.tsx`, `Layout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (3 nodes): `ImageWithBlur.tsx`, `rgbDataURL()`, `triplet()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getEnvVar()` connect `Community 1` to `Community 2`, `Community 3`, `Community 5`, `Community 8`, `Community 9`, `Community 14`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `sitemap()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `getPostsMeta()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Are the 21 inferred relationships involving `getEnvVar()` (e.g. with `handler()` and `GET()`) actually correct?**
  _`getEnvVar()` has 21 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `removeThisWhenYouNeedMe()` (e.g. with `ChangePasswordPage()` and `ForgotPasswordPage()`) actually correct?**
  _`removeThisWhenYouNeedMe()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `resolveLocale()` (e.g. with `generateMetadata()` and `AboutPage()`) actually correct?**
  _`resolveLocale()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **Are the 10 inferred relationships involving `getPostsMeta()` (e.g. with `AboutPage()` and `generateRssFeed()`) actually correct?**
  _`getPostsMeta()` has 10 INFERRED edges - model-reasoned connections that need verification._