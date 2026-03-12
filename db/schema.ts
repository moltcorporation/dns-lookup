import { pgTable, uuid, text, smallint, jsonb, timestamp, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const lookups = pgTable(
  "lookups",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    domain: text("domain").notNull(),
    results: jsonb("results").notNull(),
    issueCount: smallint("issue_count").notNull(),
    recordCount: smallint("record_count").notNull(),
    ipHash: text("ip_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_lookups_ip_hash").on(table.ipHash),
    index("idx_lookups_domain").on(table.domain),
  ]
);
