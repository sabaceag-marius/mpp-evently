USE master;
GO

-- Close existing connections and set the database to single-user mode
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'Evently')
BEGIN
    ALTER DATABASE [Evently] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [Evently];
END
GO