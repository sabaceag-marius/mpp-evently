USE [Evently];

DECLARE @workCategoryId1 UNIQUEIDENTIFIER = NEWID();
DECLARE @fitnessCategoryId1 UNIQUEIDENTIFIER = NEWID();
DECLARE @socialCategoryId1 UNIQUEIDENTIFIER = NEWID();
DECLARE @workCategoryId2 UNIQUEIDENTIFIER = NEWID();
DECLARE @schoolCategoryId2 UNIQUEIDENTIFIER = NEWID();
DECLARE @personalCategoryId2 UNIQUEIDENTIFIER = NEWID();

DECLARE @user1Id UNIQUEIDENTIFIER;
DECLARE @user2Id UNIQUEIDENTIFIER;

SET @user1Id = (SELECT Id FROM [AspNetUsers] WHERE UserName = 'user1')
SET @user2Id = (SELECT Id FROM [AspNetUsers] WHERE UserName = 'user2')

-- Insert categories for users

INSERT INTO [Categories](Id, Name, Color, UserId) VALUES
(@workCategoryId1,'Work', '9a2dc4', @user1Id),
(@fitnessCategoryId1,'Health & Fitness', '32a879', @user1Id),
(@socialCategoryId1,'Social', 'd19a19', @user1Id),

(@workCategoryId2,'Work', 'fcba03', @user2Id),
(@schoolCategoryId2,'School', 'a12a32', @user2Id),
(@personalCategoryId2,'Personal', '2860bf', @user2Id)

-- Insert Events for User1
INSERT INTO [Events] (Id, Name, Description, StartDate, EndDate, UserId, CategoryId)
VALUES
(NEWID(), 'Team Meeting', 'Weekly team sync', '2025-05-05 09:00:00', '2025-05-05 10:00:00', @user1Id, @workCategoryId1),
(NEWID(), 'Project Deadline', 'Submit final project deliverables', '2025-05-07 17:00:00', '2025-05-07 18:00:00', @user1Id, @workCategoryId1),
(NEWID(), 'Client Call', 'Discussion with ABC Corp about requirements', '2025-05-08 11:00:00', '2025-05-08 12:00:00', @user1Id, @workCategoryId1),
(NEWID(), 'Workshop', 'Agile methodology training', '2025-05-12 13:00:00', '2025-05-12 16:00:00', @user1Id, @workCategoryId1),
(NEWID(), 'Performance Review', 'Annual performance evaluation', '2025-05-14 14:00:00', '2025-05-14 15:30:00', @user1Id, @workCategoryId1),
(NEWID(), 'Conference Call', 'International partners meeting', '2025-05-15 08:00:00', '2025-05-15 09:30:00', @user1Id, @workCategoryId1),
(NEWID(), 'Brainstorming Session', 'New product ideas discussion', '2025-05-19 10:00:00', '2025-05-19 12:00:00', @user1Id, @workCategoryId1),
(NEWID(), 'Report Submission', 'Monthly metrics report due', '2025-05-21 17:00:00', '2025-05-21 17:30:00', @user1Id, @workCategoryId1),
(NEWID(), 'Team Building', 'Department team building activities', '2025-05-26 09:00:00', '2025-05-26 13:00:00', @user1Id, @workCategoryId1),
(NEWID(), 'Quarterly Planning', 'Q3 goals and objectives planning', '2025-05-28 10:00:00', '2025-05-28 15:00:00', @user1Id, @workCategoryId1),

(NEWID(), 'Morning Run', '5k run in the park', '2025-05-06 06:30:00', '2025-05-06 07:30:00', @user1Id, @fitnessCategoryId1),
(NEWID(), 'Yoga Class', 'Vinyasa flow at the studio', '2025-05-08 18:00:00', '2025-05-08 19:00:00', @user1Id, @fitnessCategoryId1),
(NEWID(), 'Gym Session', 'Strength training', '2025-05-09 07:00:00', '2025-05-09 08:00:00', @user1Id, @fitnessCategoryId1),
(NEWID(), 'Swimming', 'Lap swimming at community pool', '2025-05-11 08:00:00', '2025-05-11 09:00:00', @user1Id, @fitnessCategoryId1),
(NEWID(), 'Hiking Trip', 'Weekend hike to Blue Mountain', '2025-05-17 09:00:00', '2025-05-17 14:00:00', @user1Id, @fitnessCategoryId1),
(NEWID(), 'Spin Class', 'High-intensity cycling', '2025-05-20 17:30:00', '2025-05-20 18:30:00', @user1Id, @fitnessCategoryId1),
(NEWID(), 'Dental Checkup', 'Routine dental examination', '2025-05-22 15:00:00', '2025-05-22 16:00:00', @user1Id, @fitnessCategoryId1),
(NEWID(), 'Meditation', 'Guided meditation session', '2025-05-24 08:00:00', '2025-05-24 08:30:00', @user1Id, @fitnessCategoryId1),
(NEWID(), 'Physical Therapy', 'Knee rehabilitation session', '2025-05-27 16:00:00', '2025-05-27 17:00:00', @user1Id, @fitnessCategoryId1),
(NEWID(), 'Annual Physical', 'Comprehensive health checkup', '2025-06-03 10:00:00', '2025-06-03 11:30:00', @user1Id, @fitnessCategoryId1),

(NEWID(), 'Dinner with Friends', 'Italian restaurant downtown', '2025-05-03 19:00:00', '2025-05-03 22:00:00', @user1Id, @socialCategoryId1),
(NEWID(), 'Movie Night', 'New Marvel movie premiere', '2025-05-10 18:30:00', '2025-05-10 21:30:00', @user1Id, @socialCategoryId1),
(NEWID(), 'Birthday Party', 'Sarah''s 30th birthday celebration', '2025-05-13 20:00:00', '2025-05-14 01:00:00', @user1Id, @socialCategoryId1),
(NEWID(), 'Game Night', 'Board games with neighbors', '2025-05-16 19:00:00', '2025-05-16 23:00:00', @user1Id, @socialCategoryId1),
(NEWID(), 'Concert', 'Jazz festival in the park', '2025-05-18 16:00:00', '2025-05-18 20:00:00', @user1Id, @socialCategoryId1),
(NEWID(), 'BBQ', 'Backyard barbecue with family', '2025-05-23 14:00:00', '2025-05-23 19:00:00', @user1Id, @socialCategoryId1),
(NEWID(), 'Book Club', 'Discussion of latest read', '2025-05-25 11:00:00', '2025-05-25 13:00:00', @user1Id, @socialCategoryId1),
(NEWID(), 'Weekend Getaway', 'Trip to the lake house', '2025-05-30 16:00:00', '2025-06-01 14:00:00', @user1Id, @socialCategoryId1),
(NEWID(), 'Art Exhibition', 'Local artists showcase', '2025-06-05 18:00:00', '2025-06-05 21:00:00', @user1Id, @socialCategoryId1),
(NEWID(), 'Housewarming', 'New apartment celebration', '2025-06-07 15:00:00', '2025-06-07 19:00:00', @user1Id, @socialCategoryId1);

-- Insert Events for User2

INSERT INTO [Events] (Id, Name, Description, StartDate, EndDate, UserId, CategoryId)
VALUES
(NEWID(), 'Event 1', 'Work-related task or meeting.', '2025-04-24T05:00:00', '2025-04-24T06:00:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 2', 'Personal time or self-care activity.', '2025-04-24T12:30:00', '2025-04-24T13:15:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 3', 'Work-related task or meeting.', '2025-04-24T22:30:00', '2025-04-25T00:00:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 4', 'Personal time or self-care activity.', '2025-04-24T08:45:00', '2025-04-24T09:30:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 5', 'School assignment or lecture.', '2025-04-24T16:45:00', '2025-04-24T17:15:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 6', 'Personal time or self-care activity.', '2025-04-24T00:45:00', '2025-04-24T02:15:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 7', 'Personal time or self-care activity.', '2025-04-24T12:00:00', '2025-04-24T13:30:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 8', 'School assignment or lecture.', '2025-04-24T03:15:00', '2025-04-24T04:45:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 9', 'Work-related task or meeting.', '2025-04-24T19:15:00', '2025-04-24T20:15:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 10', 'Work-related task or meeting.', '2025-04-24T12:00:00', '2025-04-24T12:45:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 11', 'Personal time or self-care activity.', '2025-04-24T03:15:00', '2025-04-24T03:45:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 12', 'Work-related task or meeting.', '2025-04-24T14:00:00', '2025-04-24T15:30:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 13', 'Personal time or self-care activity.', '2025-04-24T20:00:00', '2025-04-24T20:30:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 14', 'Personal time or self-care activity.', '2025-04-24T20:00:00', '2025-04-24T21:00:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 15', 'Work-related task or meeting.', '2025-04-24T09:00:00', '2025-04-24T09:30:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 16', 'Personal time or self-care activity.', '2025-04-24T03:00:00', '2025-04-24T03:45:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 17', 'Personal time or self-care activity.', '2025-04-24T04:30:00', '2025-04-24T05:15:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 18', 'School assignment or lecture.', '2025-04-24T07:15:00', '2025-04-24T08:45:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 19', 'Work-related task or meeting.', '2025-04-24T21:30:00', '2025-04-24T23:00:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 20', 'School assignment or lecture.', '2025-04-24T16:15:00', '2025-04-24T17:15:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 21', 'Personal time or self-care activity.', '2025-04-24T04:30:00', '2025-04-24T05:00:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 22', 'School assignment or lecture.', '2025-04-24T16:15:00', '2025-04-24T17:15:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 23', 'Work-related task or meeting.', '2025-04-24T21:15:00', '2025-04-24T22:15:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 24', 'School assignment or lecture.', '2025-04-24T16:00:00', '2025-04-24T17:30:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 25', 'Work-related task or meeting.', '2025-04-24T09:00:00', '2025-04-24T09:45:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 26', 'School assignment or lecture.', '2025-04-24T16:30:00', '2025-04-24T17:15:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 27', 'Personal time or self-care activity.', '2025-04-24T21:00:00', '2025-04-24T21:45:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 28', 'School assignment or lecture.', '2025-04-24T11:15:00', '2025-04-24T12:15:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 29', 'Work-related task or meeting.', '2025-04-24T06:45:00', '2025-04-24T07:45:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 30', 'Personal time or self-care activity.', '2025-04-24T00:45:00', '2025-04-24T01:15:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 31', 'School assignment or lecture.', '2025-04-24T02:30:00', '2025-04-24T03:15:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 32', 'Personal time or self-care activity.', '2025-04-24T15:30:00', '2025-04-24T16:30:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 33', 'School assignment or lecture.', '2025-04-24T02:45:00', '2025-04-24T04:15:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 34', 'Work-related task or meeting.', '2025-04-24T18:00:00', '2025-04-24T18:30:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 35', 'Work-related task or meeting.', '2025-04-24T10:30:00', '2025-04-24T11:00:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 36', 'Work-related task or meeting.', '2025-04-24T10:45:00', '2025-04-24T12:15:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 37', 'School assignment or lecture.', '2025-04-24T20:00:00', '2025-04-24T20:30:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 38', 'School assignment or lecture.', '2025-04-24T14:30:00', '2025-04-24T15:30:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 39', 'Personal time or self-care activity.', '2025-04-24T11:00:00', '2025-04-24T12:30:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 40', 'Personal time or self-care activity.', '2025-04-24T01:00:00', '2025-04-24T01:45:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 41', 'School assignment or lecture.', '2025-04-24T16:00:00', '2025-04-24T16:30:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 42', 'Personal time or self-care activity.', '2025-04-24T18:00:00', '2025-04-24T18:45:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 43', 'Work-related task or meeting.', '2025-04-24T15:15:00', '2025-04-24T16:15:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 44', 'Work-related task or meeting.', '2025-04-24T19:15:00', '2025-04-24T20:45:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 45', 'Work-related task or meeting.', '2025-04-24T22:45:00', '2025-04-24T23:45:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 46', 'School assignment or lecture.', '2025-04-24T11:45:00', '2025-04-24T12:15:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 47', 'Personal time or self-care activity.', '2025-04-24T01:15:00', '2025-04-24T01:45:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 48', 'School assignment or lecture.', '2025-04-24T17:15:00', '2025-04-24T18:00:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 49', 'Work-related task or meeting.', '2025-04-24T05:45:00', '2025-04-24T07:15:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 50', 'Personal time or self-care activity.', '2025-04-24T20:00:00', '2025-04-24T20:45:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 51', 'School assignment or lecture.', '2025-04-24T22:00:00', '2025-04-24T22:30:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 52', 'Personal time or self-care activity.', '2025-04-24T09:30:00', '2025-04-24T11:00:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 53', 'School assignment or lecture.', '2025-04-24T02:00:00', '2025-04-24T03:00:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 54', 'Work-related task or meeting.', '2025-04-24T10:30:00', '2025-04-24T12:00:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 55', 'School assignment or lecture.', '2025-04-24T19:15:00', '2025-04-24T20:45:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 56', 'School assignment or lecture.', '2025-04-24T00:15:00', '2025-04-24T00:45:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 57', 'School assignment or lecture.', '2025-04-24T00:15:00', '2025-04-24T01:15:00', @user2Id, @schoolCategoryId2),
(NEWID(), 'Event 58', 'Personal time or self-care activity.', '2025-04-24T13:45:00', '2025-04-24T15:15:00', @user2Id, @personalCategoryId2),
(NEWID(), 'Event 59', 'Work-related task or meeting.', '2025-04-24T10:15:00', '2025-04-24T10:45:00', @user2Id, @workCategoryId2),
(NEWID(), 'Event 60', 'Personal time or self-care activity.', '2025-04-24T16:45:00', '2025-04-24T17:30:00', @user2Id, @personalCategoryId2)
