CREATE TABLE "Vacations" (
	"vacationId" uuid PRIMARY KEY NOT NULL,
	"startsOn" date NOT NULL,
	"endsOn" date NOT NULL,
	"note" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
