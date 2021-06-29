SELECT [productId]
        ,[name]
        ,[description]
        ,[price]
        ,[currency]
        ,[views]
        ,[deleted]
FROM [dbo].[products]
WHERE [deleted]=0