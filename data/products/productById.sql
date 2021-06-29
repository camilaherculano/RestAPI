SELECT [productId],
        [name],
        [description],
        [price],
        [currency],
        [views],
        [deleted]
FROM [dbo].[products]
WHERE [productId]=@productId AND [deleted]=0