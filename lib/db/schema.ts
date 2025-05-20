import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"


export const files = pgTable("files", {
    id : uuid("id").defaultRandom().primaryKey(),

    //folder/file info
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),

    //storage info
    fileUrl : text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),

    // user info
    userId : text("user_id").notNull(),
    parentId : text("parent_id"),

    //file/folder flags
    isFolder : boolean("is_folder").default(false).notNull(),
    isStarred : boolean("is_starred").default(false).notNull(),
    isTrash : boolean("is_trash").default(false).notNull(),

    // timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const filesRelations = relations(files, ({one, many}) => (
    {
        parent : one(files, {
            fields: [files.parentId],
            references: [files.id],
            relationName: "parentToChild"
        }),

        children: many(files, {
            relationName: "parentToChild"
        })
    }
))

export const File = typeof files.$inferSelect
export const NewFile = typeof files.$inferInsert