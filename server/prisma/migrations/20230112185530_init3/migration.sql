-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PushSubscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "endpoint" TEXT NOT NULL,
    "expirationTime" TEXT NOT NULL,
    "p256dhKey" TEXT NOT NULL,
    "authKey" TEXT NOT NULL
);
INSERT INTO "new_PushSubscription" ("authKey", "endpoint", "expirationTime", "id", "p256dhKey", "userId") SELECT "authKey", "endpoint", "expirationTime", "id", "p256dhKey", "userId" FROM "PushSubscription";
DROP TABLE "PushSubscription";
ALTER TABLE "new_PushSubscription" RENAME TO "PushSubscription";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
