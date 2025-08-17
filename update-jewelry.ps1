# Update jewelry products with real images

$filePath = "c:\Users\User\Documents\ThreadTheory\jewellery.html"
$content = Get-Content $filePath -Raw

# Product 2
$content = $content -replace '<div class="image-placeholder">\s*<p>Jewelry 2</p>\s*<span class="placeholder-text">Your image will go here</span>\s*</div>', '<img src="j2.jpg" alt="Pastel Flower Necklace" class="product-img">'
$content = $content -replace '<h3 class="product-name">Statement Earrings</h3>\s*<p class="product-price">\$44\.99</p>', '<h3 class="product-name">Pastel Flower Necklace</h3><p class="product-price">$48.99</p>'

# Product 3
$content = $content -replace '<div class="image-placeholder">\s*<p>Jewelry 3</p>\s*<span class="placeholder-text">Your image will go here</span>\s*</div>', '<img src="j3.jpg" alt="Purple Circle Drop Earrings" class="product-img">'
$content = $content -replace '<h3 class="product-name">Elegant Bracelet</h3>\s*<p class="product-price">\$29\.99</p>', '<h3 class="product-name">Purple Circle Drop Earrings</h3><p class="product-price">$32.99</p>'

# Product 4
$content = $content -replace '<div class="image-placeholder">\s*<p>Jewelry 4</p>\s*<span class="placeholder-text">Your image will go here</span>\s*</div>', '<img src="j4.jpg" alt="Colorful Flower Earrings Collection" class="product-img">'
$content = $content -replace '<h3 class="product-name">Vintage Ring</h3>\s*<p class="product-price">\$52\.99</p>', '<h3 class="product-name">Flower Earrings Collection</h3><p class="product-price">$28.99</p>'

# Product 5
$content = $content -replace '<div class="image-placeholder">\s*<p>Jewelry 5</p>\s*<span class="placeholder-text">Your image will go here</span>\s*</div>', '<img src="j5.jpg" alt="Purple Ruffle Hoop Earrings" class="product-img">'
$content = $content -replace '<h3 class="product-name">Charm Pendant</h3>\s*<p class="product-price">\$38\.99</p>', '<h3 class="product-name">Purple Ruffle Hoop Earrings</h3><p class="product-price">$38.99</p>'

# Product 6
$content = $content -replace '<div class="image-placeholder">\s*<p>Jewelry 6</p>\s*<span class="placeholder-text">Your image will go here</span>\s*</div>', '<img src="j6.jpg" alt="White Flower Jewelry Set" class="product-img">'
$content = $content -replace '<h3 class="product-name">Bohemian Anklet</h3>\s*<p class="product-price">\$24\.99</p>', '<h3 class="product-name">White Flower Jewelry Set</h3><p class="product-price">$42.99</p>'

Set-Content $filePath -Value $content -NoNewline
Write-Host "Updated jewelry products with real images!"