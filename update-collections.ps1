# Update collection face images

$filePath = "c:\Users\User\Documents\ThreadTheory\index.html"
$content = Get-Content $filePath -Raw

# Replace all image placeholders with actual images
$content = $content -replace '<div class="image-placeholder">\s*<p>Jerseys</p>\s*</div>', '<img src="jerseys.jpg" alt="Jerseys Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Dresses</p>\s*</div>', '<img src="dresses.jpg" alt="Dresses Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Tops</p>\s*</div>', '<img src="tops.jpg" alt="Tops Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Bottoms</p>\s*</div>', '<img src="bottoms.jpg" alt="Bottoms Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Skirts</p>\s*</div>', '<img src="skirts.jpg" alt="Skirts Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Shorts</p>\s*</div>', '<img src="shorts.jpg" alt="Shorts Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Two Piece</p>\s*</div>', '<img src="two piece.jpg" alt="Two Piece Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Jumpsuit</p>\s*</div>', '<img src="jumpsuit.jpg" alt="Jumpsuit Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Shrugs</p>\s*</div>', '<img src="shrugs.jpg" alt="Shrugs Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Bags</p>\s*</div>', '<img src="bags.jpg" alt="Bags Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Accessories</p>\s*</div>', '<img src="accessories.jpg" alt="Accessories Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Shoes</p>\s*</div>', '<img src="shoes.jpg" alt="Shoes Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Hair</p>\s*</div>', '<img src="hair.jpg" alt="Hair Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Jewellery</p>\s*</div>', '<img src="jewellery.jpg" alt="Jewellery Collection" class="collection-img">'
$content = $content -replace '<div class="image-placeholder">\s*<p>Hats</p>\s*</div>', '<img src="hats.jpg" alt="Hats Collection" class="collection-img">'

Set-Content $filePath -Value $content -NoNewline
Write-Host "Updated all collection face images!"