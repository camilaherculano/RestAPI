-- DELETE [dbo].[products]
-- WHERE [productId]=@productId

UPDATE [dbo].[products]
SET [deleted]=@deleted
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