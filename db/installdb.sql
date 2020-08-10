CREATE TABLE practiceCategory (
                    id              INTEGER PRIMARY KEY AUTOINCREMENT,
                    categoryName    TEXT NOT NULL,
                    categoryDesc	TEXT
                );

CREATE TABLE practiceInstrument (
                    id              INTEGER PRIMARY KEY AUTOINCREMENT,
                    instrumentName  TEXT NOT NULL
                );

CREATE TABLE items (
                    id              INTEGER PRIMARY KEY AUTOINCREMENT,
                    categoryID      INTEGER NOT NULL,
                    instrumentID    INTEGER NOT NULL,
                    title           TEXT NOT NULL,
                    description     TEXT,
                    duration        INTEGER NOT NULL,
                    durationDesc    TEXT,
                    goalDesc        TEXT,
                    scheduleDesc    TEXT,
                    startDate       TEXT,
                    endDate         TEXT,
                    lastPractice    TEXT,
                    totalTime       INTEGER,
                    archived        INTEGER DEFAULT 0,
                        FOREIGN KEY (categoryID) REFERENCES practiceCategory(id),
                        FOREIGN KEY (instrumentID) REFERENCES practiceInstrument(id)
                );

CREATE TABLE itemLink (
                    id              INTEGER PRIMARY KEY AUTOINCREMENT,
                    itemID          INTEGER NOT NULL,
                    linkURL         TEXT NOT NULL,
                    linkType        INTEGER NOT NULL DEFAULT 0,
                        FOREIGN KEY (itemID) REFERENCES items(id)
                );

CREATE TABLE itemNotes (
                    id              INTEGER PRIMARY KEY AUTOINCREMENT,
                    itemID          INTEGER NOT NULL,
                    noteDate        TEXT NOT NULL,
                    noteText        TEXT NOT NULL,
                        FOREIGN KEY (itemID) REFERENCES items(id)
                );

CREATE TABLE practice (
                    id              INTEGER,
                    instrumentID    INTEGER NOT NULL,
                    itemID          INTEGER NOT NULL,
                    status			INTEGER MOT NULL DEFAULT 0,
                    repeat          INTEGER NOT NULL DEFAULT 1,
                    duration        INTEGER NOT NULL DEFAULT 0,
                    mood            INTEGER NOT NULL DEFAULT 4,
                    goalValue		INTEGER,
                    noteText        TEXT,
                        PRIMARY KEY( id, instrumentID, itemID ),
                        FOREIGN KEY (itemID) REFERENCES items(id),
                        FOREIGN KEY (instrumentID) REFERENCES practiceInstrument(id)
                );

CREATE TABLE practiceSchedule (
					scheduleDate	INTEGER NOT NULL,
					paracticeID		INTEGER NOT NULL,
                        FOREIGN KEY (paracticeID) REFERENCES practice(id)
                );

