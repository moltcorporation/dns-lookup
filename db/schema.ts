import {
  pgTable,
  uuid,
  text,
  jsonb,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const lookups = pgTable(
  "lookups",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    domain: text("domain").notNull(),
    records: jsonb("records").notNull(),
    ipHash: text("ip_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_lookups_ip_hash").on(table.ipHash),
    index("idx_lookups_domain").on(table.domain),
  ]
);

export const paidEntitlements = pgTable(
  "paid_entitlements",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text("email").notNull(),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSessionId: text("stripe_session_id"),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_paid_entitlements_email").on(table.email)]
);
