-- Two surfaces: visitor (anonymous, session-scoped) and admin (owner, user-scoped).
-- See docs/architecture/chat.md and docs/architecture/chat-persistence.md.
--
-- The `kind` column is NOT NULL. For existing rows (pre-feature, all from the
-- single admin-side `/chat` surface), we backfill 'adminAssistant' inside the
-- same migration so the constraint can be applied without a separate manual
-- step. New rows must specify `kind` at insert time — the schema's column
-- definition has no default, only this migration does.
ALTER TABLE "Chats" ADD COLUMN "kind" varchar;--> statement-breakpoint
UPDATE "Chats" SET "kind" = 'adminAssistant' WHERE "kind" IS NULL;--> statement-breakpoint
ALTER TABLE "Chats" ALTER COLUMN "kind" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Chats" ADD COLUMN "sessionId" uuid;--> statement-breakpoint
ALTER TABLE "Chats" ADD COLUMN "ownerUserId" uuid;--> statement-breakpoint
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_sessionId_Sessions_sessionId_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."Sessions"("sessionId") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_ownerUserId_Users_userId_fk" FOREIGN KEY ("ownerUserId") REFERENCES "public"."Users"("userId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "Chats_sessionId_lastModifiedAt_idx" ON "Chats" USING btree ("sessionId","lastModifiedAt");--> statement-breakpoint
CREATE INDEX "Chats_ownerUserId_lastModifiedAt_idx" ON "Chats" USING btree ("ownerUserId","lastModifiedAt");--> statement-breakpoint
CREATE INDEX "Chats_kind_idx" ON "Chats" USING btree ("kind");
