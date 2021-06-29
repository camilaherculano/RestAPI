UPDATE [dbo].[products]
SET [name]=@name,
    [description]=@description,
    [price]=@price,
    [currency]=@currency,
    [views]=@views,
    [deleted]=@deleted
WHERE [productId]=@productId

SELECT [productId],
        [name],
        [description],
        [price],
        [currency],
        [views],
        [deleted]
FROM [dbo].[products]
WHERE [productId]=@productId