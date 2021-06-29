INSERT INTO [dbo].[products]
    (
        [name],
        [description],
        [price],
        [currency],
        [views],
        [deleted]
    )
VALUES (
    @name,
    @description,
    @price,
    @currency,
    @views,
    @deleted
)

SELECT SCOPE_IDENTITY() AS productId