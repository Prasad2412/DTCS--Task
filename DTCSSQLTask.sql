USE [AngularJS]
GO
/****** Object:  StoredProcedure [dbo].[CheckDuplicateRecord]    Script Date: 4/26/2020 5:10:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Prasad Marathe>
-- Create date: <25/04/2020>
-- Description:	<Check Duplicate Record In Patient >
-- =============================================
-- EXEC CheckDuplicateRecord 'PRASAD','Marathe','Male','1','2'
CREATE PROCEDURE [dbo].[CheckDuplicateRecord] @FirstName VARCHAR(100) = NULL
	,@LastName VARCHAR(100) = NULL
	,@Gender VARCHAR(100) = NULL
	,@State VARCHAR(100) = NULL
	,@City VARCHAR(100) =  NULL
AS
BEGIN
	SELECT pa.FirstName,pa.LastName,pa.Gender,st.StateName,CI.CityName
	FROM Patient AS pa
	LEFT JOIN STATE AS st ON pa.STATE = st.StateId
	LEFT JOIN City AS CI ON pa.City = CI.CityId
	WHERE pa.FirstName LIKE '%' + @FirstName + '%'
		AND pa.LastName LIKE '%' + @LastName + '%'
		AND pa.Gender LIKE '%' + @Gender + '%'
		AND st.StateId LIKE '%' + @State + '%'
		AND CI.CityId LIKE '%' + @City + '%'
END

GO
/****** Object:  StoredProcedure [dbo].[GetAllRocordForListing]    Script Date: 4/26/2020 5:10:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Prasad Marathe>
-- Create date: <25/04/2020>
-- Description:	<Get All Record For Listing>
-- =============================================
-- EXEC GetAllRocordForListing
CREATE PROCEDURE [dbo].[GetAllRocordForListing]
AS
BEGIN
	SELECT PA.PatientId
	    ,PA.FirstName
		,PA.LastName
		,PA.Gender
		,PA.DateOfBirth
		,ST.StateId
		,ST.StateName
		,CI.CityId
		,CI.CityName
	FROM Patient AS PA
	LEFT JOIN STATE AS ST ON PA.STATE = ST.StateId
	LEFT JOIN City AS CI ON PA.City = CI.CityId
END

GO
/****** Object:  Table [dbo].[City]    Script Date: 4/26/2020 5:10:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[CityId] [int] IDENTITY(1,1) NOT NULL,
	[CityName] [nvarchar](150) NULL,
	[StateId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Login]    Script Date: 4/26/2020 5:10:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Login](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[Username] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
 CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 4/26/2020 5:10:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Patient](
	[PatientId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](250) NULL,
	[LastName] [nvarchar](250) NULL,
	[Gender] [nvarchar](250) NULL,
	[DateOfBirth] [nvarchar](250) NULL,
	[State] [nvarchar](250) NULL,
	[City] [nvarchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[State]    Script Date: 4/26/2020 5:10:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[State](
	[StateId] [int] IDENTITY(1,1) NOT NULL,
	[StateName] [nvarchar](150) NULL,
	[ShortForm] [nvarchar](150) NULL,
PRIMARY KEY CLUSTERED 
(
	[StateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


GO
