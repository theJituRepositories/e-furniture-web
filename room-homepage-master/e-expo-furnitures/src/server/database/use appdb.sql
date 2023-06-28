
SELECT * FROM artists
-- Create the Artwork table
SELECT * FROM artwork
-- Add createdAt and updatedAt columns to Artwork table
ALTER TABLE Artwork
ADD createdAt DATE NOT NULL,
    updatedAt DATE NOT NULL;
SELECT * FROM artwork

CREATE TABLE Users (
  id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  isArtist BIT NOT NULL,
  location VARCHAR(255),
  artist_id INT,
  FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

        SELECT * FROM Users
CREATE TABLE orders (
  id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  user_id INT NOT NULL,
  shippingAddress NVARCHAR(MAX) NOT NULL,
  paymentMethod NVARCHAR(255) NOT NULL,
  paymentResult NVARCHAR(MAX),
  taxPrice FLOAT NOT NULL DEFAULT 0.0,
  shippingPrice FLOAT NOT NULL DEFAULT 0.0,
  totalPrice FLOAT NOT NULL DEFAULT 0.0,
  isPaid BIT NOT NULL DEFAULT 0,
  paidAt DATETIME,
  isDelivered BIT NOT NULL DEFAULT 0,
  deliveredAt DATETIME,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);


-- SQL QUERIES
