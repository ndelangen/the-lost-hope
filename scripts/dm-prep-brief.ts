/** Print the DM prep brief that a session import reads before the notes. */
import { buildPrepBrief } from '#/lib/dm-prep-brief'

process.stdout.write(buildPrepBrief())
