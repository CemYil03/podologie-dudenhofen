ALTER TABLE "Sessions" ADD COLUMN "ipHash" varchar;--> statement-breakpoint
CREATE INDEX "Sessions_ipHash_idx" ON "Sessions" USING btree ("ipHash");