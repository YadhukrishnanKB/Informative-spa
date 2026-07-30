import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { revalidatePath } from 'next/cache'

function pathForSlug(slug: unknown): string {
  if (typeof slug !== 'string' || !slug || slug === 'home') return '/'
  return `/${slug}`
}

export const revalidatePage: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  const path = pathForSlug(doc.slug)
  payload.logger.info(`Revalidating page at path: ${path}`)
  revalidatePath(path)

  const previousSlug = previousDoc?.slug
  if (typeof previousSlug === 'string' && previousSlug !== doc.slug) {
    const oldPath = pathForSlug(previousSlug)
    payload.logger.info(`Revalidating old page at path: ${oldPath}`)
    revalidatePath(oldPath)
  }

  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (context.disableRevalidate) return doc

  revalidatePath(pathForSlug(doc?.slug))
  return doc
}

export const revalidateThemeSettings: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  payload.logger.info('Revalidating layout after theme-settings change')
  revalidatePath('/', 'layout')
  return doc
}
