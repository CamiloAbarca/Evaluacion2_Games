CREATE TABLE title (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nameGame VARCHAR(90) NOT NULL,
    plataform VARCHAR(90) NOT NULL,
    detail TEXT,
	 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO title (nameGame, plataform, detail) VALUES ("Warzone", "PS4", "Juego Shooter.");