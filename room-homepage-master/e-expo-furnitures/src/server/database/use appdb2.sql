use appdb
INSERT INTO artists
    (
    artist_id,
    artist_Fname,
    artist_Lname,
    artist_username,
    artist_password,
    artist_email,
    artist_phone,
    artwork_id
    )
VALUES
    (
        1,
        'John',
        'Doe',
        'johndoe',
        'password123',
        'johndoe@example.com',
        '1234567890',
        1
    ),
    (
        2,
        'Jane',
        'Smith',
        'janesmith',
        'password456',
        'janesmith@example.com',
        '9876543210',
        2
    ),
    (
        3,
        'Alice',
        'Johnson',
        'alicejohnson',
        'password789',
        'alicejohnson@example.com',
        '5555555555',
        3
    );


INSERT INTO artwork
    (
    artwork_name,
    artwork_price,
    artwork_description,
    artwork_image_path,
    artwork_id,
    createdAt,
    updatedAt
    )
VALUES
    (
        'Mc Artley Special Edition',
        199.99,
        'This is an ancient piece of the jewish war, a special edition of Mc Artley',
        '../Users/belli/Documents/scripts/theJitu/art-cafe/public/images/grit-special.png',
        1,
        GETDATE(),
        GETDATE()
    ),
    (
        'gypsum-tot',
        299.99,
        'A unique piece of art from the gypsum tot, a great piece of art from the gypsum tot',
        '../Users/belli/Documents/scripts/theJitu/art-cafe/public/images/gypsum-tot.png',
        2,
        GETDATE(),
        GETDATE()
    ),
    (
        'Griit Special Edition',
        399.99,
        'This is an ancient piece of the jewish war, a special edition of Mc Artley',
        '../Users/belli/Documents/scripts/theJitu/art-cafe/public/images/grit-special.png',
        3,
        GETDATE(),
        GETDATE()
    );

-- Dropping foreign key constraint in the artwork table
ALTER TABLE artwork
DROP CONSTRAINT fk_artist_id;

-- Dropping primary key constraint in the artist table
ALTER TABLE artist
DROP CONSTRAINT PK_artwork_id;
-- Find foreign keys referencing to dbo.states table
SELECT name AS 'Foreign Key Constraint Name',
    OBJECT_SCHEMA_NAME(parent_object_id) + '.' + OBJECT_NAME(parent_object_id) AS 'Child Table'
FROM sys.foreign_keys
WHERE OBJECT_SCHEMA_NAME(referenced_object_id) = 'dbo' AND
    OBJECT_NAME(referenced_object_id) = 'artists';
    -- Drop the foreign key constraint by its name 
ALTER TABLE dbo.artists DROP CONSTRAINT fk_artwork_artist;
-- Query to retrieve constraints in the artwork table
SELECT name, type_desc
FROM sys.key_constraints
WHERE parent_object_id = OBJECT_ID('artwork');

-- Query to retrieve constraints in the artist table
SELECT name, type_desc
FROM sys.key_constraints
WHERE parent_object_id = OBJECT_ID('artist');

SELECT *
FROM artists

DROP TABLE artists
DROP TABLE artwork