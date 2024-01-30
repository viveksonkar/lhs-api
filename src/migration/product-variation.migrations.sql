-- Product Variant

WITH TEMP AS (
	SELECT id as product_id, price, status, 'SIMPLE' as variant, 'SIMPLE' as "variantValue", "partNo", "hsCode", "description" FROM product
)
INSERT INTO "public"."product-variant"(product_id, price, status, variant, "variantValue", "partNo", "hsCode", "description") 
SELECT product_id, price, status, variant, "variantValue", "partNo", "hsCode", "description" FROM TEMP;

WITH PROD_VAR AS (
	SELECT 
		"prod"."availableQuantity" AS "quantity", "prod"."minimumQuantity", "prodv"."id" as "variant_id"
	FROM "public"."product" AS prod INNER JOIN "public"."product-variant" AS "prodv"
	ON PROD.id = "prodv"."product_id"
)
INSERT INTO "public"."product-sku"(quantity, "minimumQuantity", "variant_id")
SELECT * FROM PROD_VAR;

WITH PROD_GALLERY AS (
	SELECT 
		"pimages"."key", "pimages"."url", "prodv"."id" as "variant_id"
	FROM 
		"public"."product" AS prod 
		INNER JOIN "public"."product-variant" AS "prodv" ON PROD.id = "prodv"."product_id"
		INNER JOIN "public"."product-image" AS "pimages" ON PROD.id = pimages."productId"
)
INSERT INTO "public"."product-gallery"(key, url, "variant_id")
SELECT * FROM PROD_GALLERY;