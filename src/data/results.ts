import type { PaperResult } from '../types'

export const specUnderstood = (r: PaperResult) => r.specUnderstoodBy.length > 0
export const implUnderstood = (r: PaperResult) => r.implUnderstoodBy.length > 0
