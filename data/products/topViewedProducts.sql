SELECT TOP (@amount) [productId],
        [name],
        [description],
        [price],
        [currency],
        [views],
        [deleted]
FROM [dbo].[products]
WHERE [views] > 0 AND [deleted]=0
ORDER BY [views] DESC