
CREATE TABLE roommates(
	id VARCHAR PRIMARY KEY,
	name VARCHAR NOT NULL,
	cash INT DEFAULT 10000,
	pay INT DEFAULT 0
)

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    roommate_id VARCHAR NOT NULL,
    amount INT NOT NULL,
    comment VARCHAR NOT NULL,
    FOREIGN KEY (roommate_id) REFERENCES roommates(id)
);

