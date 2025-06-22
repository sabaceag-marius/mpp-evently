USE [Evently];

-- drop table groupuser, groupevent, groups
CREATE TABLE [Groups](
	Id UNIQUEIDENTIFIER PRIMARY KEY NONCLUSTERED,
	Name VARCHAR(100) NOT NULL,
	Description VARCHAR (100) NOT NULL,

);
 
CREATE TABLE [GroupUser](
	
	GroupsId UNIQUEIDENTIFIER NOT NULL REFERENCES [Groups],
	UsersId UNIQUEIDENTIFIER NOT NULL REFERENCES [AspNetUsers],

	PRIMARY KEY (GroupsId, UsersId)
)

CREATE TABLE [GroupEvent](
	GroupsId UNIQUEIDENTIFIER NOT NULL REFERENCES [Groups],
	EventsId UNIQUEIDENTIFIER NOT NULL REFERENCES [Events],

	PRIMARY KEY (GroupsId, EventsId)
)
USE [Evently];

DECLARE @user1Id UNIQUEIDENTIFIER;
DECLARE @user2Id UNIQUEIDENTIFIER;

SET @user1Id = (SELECT Id FROM [AspNetUsers] WHERE UserName = 'user1')
SET @user2Id = (SELECT Id FROM [AspNetUsers] WHERE UserName = 'user2')

DECLARE @group1Id UNIQUEIDENTIFIER;
DECLARE @group2Id UNIQUEIDENTIFIER;
DECLARE @group3Id UNIQUEIDENTIFIER;

SET @group1Id = NEWID();
SET @group2Id = NEWID();
SET @group3Id = NEWID();

-- 3 GROUPS:
-- group with only user 1,
-- group with only user 2,
-- group with both users

INSERT INTO [Groups](Id, Name, Description) VALUES
(@group1Id,' User1s Group', 'This is the group of the first user'),
(@group2Id,' User2s Group', 'This is the group of the second user'),
(@group3Id,' Shared Group', 'This is a shared group with the first 2 users')

INSERT INTO [GroupUser] (GroupsId,UsersId) VALUES

(@group1Id,@user1Id),
(@group2Id,@user2Id),
(@group3Id,@user1Id),
(@group3Id,@user2Id)
