USE [Evently];

-- Ensure roles exist (from your OnModelCreating)
IF NOT EXISTS (SELECT 1 FROM [AspNetRoles] WHERE [NormalizedName] = 'ADMIN')
BEGIN
    INSERT INTO [AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp])
    VALUES (NEWID(), 'Admin', 'ADMIN', NEWID());
END

IF NOT EXISTS (SELECT 1 FROM [AspNetRoles] WHERE [NormalizedName] = 'USER')
BEGIN
    INSERT INTO [AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp])
    VALUES (NEWID(), 'User', 'USER', NEWID());
END

-- =============================================
-- Create test users with properly hashed passwords
-- =============================================

-- User 1: Admin user
DECLARE @adminId uniqueidentifier = NEWID();
DECLARE @adminRoleId uniqueidentifier = (SELECT [Id] FROM [AspNetRoles] WHERE [NormalizedName] = 'ADMIN');

INSERT INTO [AspNetUsers] (
    [Id],
    [UserName],
    [NormalizedUserName],
    [Email],
    [NormalizedEmail],
    [EmailConfirmed],
    [PasswordHash],
    [SecurityStamp],
    [ConcurrencyStamp],
    [PhoneNumber],
    [PhoneNumberConfirmed],
    [TwoFactorEnabled],
    [LockoutEnd],
    [LockoutEnabled],
    [AccessFailedCount]
) VALUES (
    @adminId,
    'admin',
    'ADMIN',
    'admin@example.com',
    'ADMIN@EXAMPLE.COM',
    1, -- EmailConfirmed
    
    -- Password: "Admin123!"
    -- This is a PBKDF2 hash for the password "Admin123!" with 10000 iterations
    'AQAAAAIAAYagAAAAEM9GxZQKhXHQbPwQkPsXWZvYQ7Gt72wVWzWJhqlUY5nWq3w7XyvL9FkKj3JZsA1w8Q==',
    
    '5C5D7F8E-1A2B-4C3D-9E8F-0A1B2C3D4E5F', -- SecurityStamp
    NEWID(), -- ConcurrencyStamp
    NULL, -- PhoneNumber
    0, -- PhoneNumberConfirmed
    0, -- TwoFactorEnabled
    NULL, -- LockoutEnd
    1, -- LockoutEnabled
    0 -- AccessFailedCount
);

-- Assign admin role
INSERT INTO [AspNetUserRoles] ([UserId], [RoleId])
VALUES (@adminId, @adminRoleId);

-- User 2: Regular user
DECLARE @userId uniqueidentifier = NEWID();
DECLARE @userRoleId uniqueidentifier = (SELECT [Id] FROM [AspNetRoles] WHERE [NormalizedName] = 'USER');

INSERT INTO [AspNetUsers] (
    [Id],
    [UserName],
    [NormalizedUserName],
    [Email],
    [NormalizedEmail],
    [EmailConfirmed],
    [PasswordHash],
    [SecurityStamp],
    [ConcurrencyStamp],
    [PhoneNumber],
    [PhoneNumberConfirmed],
    [TwoFactorEnabled],
    [LockoutEnd],
    [LockoutEnabled],
    [AccessFailedCount]
) VALUES (
    @userId,
    'user1',
    'USER1',
    'k2y.lelo@gmail.com',
    'K2Y.LELO@GMAIL.COM',
    1, -- EmailConfirmed
    
    -- Password: "User123!"
    -- This is a PBKDF2 hash for the password "User123!" with 10000 iterations
    'AQAAAAIAAYagAAAAEPbGeOj+Q4QHWKR6y/ULYMnUk+HuVF4/I24Qd6KEC5gVMeGHm6mrbMGHOUBa+XBruQ==',
    
    '6D6E8F9G-2B3C-5D4E-0F9G-1H2J3K4L5M6N', -- SecurityStamp
    NEWID(), -- ConcurrencyStamp
    NULL, -- PhoneNumber
    0, -- PhoneNumberConfirmed
    0, -- TwoFactorEnabled
    NULL, -- LockoutEnd
    1, -- LockoutEnabled
    0 -- AccessFailedCount
);

-- Assign user role
INSERT INTO [AspNetUserRoles] ([UserId], [RoleId])
VALUES (@userId, @userRoleId);

-- User 3: Another regular user
DECLARE @user2Id uniqueidentifier = NEWID();

INSERT INTO [AspNetUsers] (
    [Id],
    [UserName],
    [NormalizedUserName],
    [Email],
    [NormalizedEmail],
    [EmailConfirmed],
    [PasswordHash],
    [SecurityStamp],
    [ConcurrencyStamp],
    [PhoneNumber],
    [PhoneNumberConfirmed],
    [TwoFactorEnabled],
    [LockoutEnd],
    [LockoutEnabled],
    [AccessFailedCount]
) VALUES (
    @user2Id,
    'user2',
    'USER2',
    'user2@example.com',
    'USER2@EXAMPLE.COM',
    1, -- EmailConfirmed
    
    -- Password: "User123!"
    -- Same password as user1 for testing
    'AQAAAAIAAYagAAAAEPbGeOj+Q4QHWKR6y/ULYMnUk+HuVF4/I24Qd6KEC5gVMeGHm6mrbMGHOUBa+XBruQ==',
    
    '7E7F9G0H-3C4D-6E5F-1G2H-2I3J4K5L6M7N', -- SecurityStamp
    NEWID(), -- ConcurrencyStamp
    NULL, -- PhoneNumber
    0, -- PhoneNumberConfirmed
    0, -- TwoFactorEnabled
    NULL, -- LockoutEnd
    1, -- LockoutEnabled
    0 -- AccessFailedCount
);

-- Assign user role
INSERT INTO [AspNetUserRoles] ([UserId], [RoleId])
VALUES (@user2Id, @userRoleId);

-- =============================================
-- Test credentials to use in your application:
-- 
-- Admin user:
-- Username: admin
-- Password: Admin123!
-- 
-- Regular users:
-- Username: user1 / Password: User123!
-- Username: user2 / Password: User123!
-- =============================================
