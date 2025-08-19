# Remove collection descriptions from index.html
$content = Get-Content "index.html" -Raw

# Replace all collection overlays to only show the button
$patterns = @(
    '<p>Comfortable and stylish knit jerseys</p>',
    '<p>Elegant layering pieces</p>',
    '<p>Handcrafted knit and crochet skirts</p>',
    '<p>Beautiful handmade dresses</p>',
    '<p>Stylish tops for every occasion</p>',
    '<p>Comfortable and trendy shorts</p>',
    '<p>Handcrafted bags and purses</p>',
    '<p>Elegant one-piece outfits</p>',
    '<p>Coordinated two-piece sets</p>',
    '<p>Comfortable bottoms collection</p>',
    '<p>Stylish hats and headwear</p>',
    '<p>Beautiful accessories collection</p>',
    '<p>Handcrafted footwear</p>',
    '<p>Beautiful hair accessories</p>'
)

foreach ($pattern in $patterns) {
    $content = $content -replace [regex]::Escape($pattern), ''
}

# Clean up any extra whitespace
$content = $content -replace '\s+<button class="collection-btn">', '                            <button class="collection-btn">'

Set-Content "index.html" $content -NoNewline
Write-Host "Removed all collection descriptions from index.html"