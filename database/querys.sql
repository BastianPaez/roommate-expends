
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


INSERT INTO roommates (id, name) VALUES
    ('V1StGXR8_Z5jdHi6B-myT5', 'GG GG 69');
	
INSERT INTO expenses (roommate_id, amount, comment) VALUES
    ('V1StGXR8_Z5jdHi6B-myT1', 200, 'Compra de alimentos'),
    ('V1StGXR8_Z5jdHi6B-myT2', 150, 'Pago de servicios públicos'),
    ('V1StGXR8_Z5jdHi6B-myT3', 300, 'Reparación de electrodomésticos');
	
	SELECT 
	expenses.id AS expenses_id,
    roommates.id AS roommate_id,
    roommates.name AS roommate_name,
    expenses.amount,
    expenses.comment
FROM 
    roommates
INNER JOIN 
    expenses
ON 
    roommates.id = expenses.roommate_id;