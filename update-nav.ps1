# Update navigation in all collection pages
$collectionFiles = @(
    "jerseys.html", "shrugs.html", "skirts.html", "dresses.html", "tops.html", 
    "shorts.html", "bags.html", "jumpsuits.html", "two-piece.html", "bottoms.html", 
    "hats.html", "accessories.html", "shoes.html", "hair.html"
)

$oldNav = @'
            <ul class="nav-menu" id="nav-menu">
                <li class="nav-item">
                    <a href="index.html" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="index.html#collections" class="nav-link">Collections</a>
                </li>
                <li class="nav-item">
                    <a href="index.html#about" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                    <a href="index.html#contact" class="nav-link">Contact</a>
                </li>
            </ul>
'@

$newNav = @'
            <ul class="nav-menu" id="nav-menu">
                <li class="nav-item">
                    <a href="index.html" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="index.html#collections" class="nav-link">Collections</a>
                </li>
                <li class="nav-item">
                    <a href="about.html" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                    <a href="contact.html" class="nav-link">Contact</a>
                </li>
                <li class="nav-item">
                    <a href="cart.html" class="nav-link">My Cart</a>
                </li>
            </ul>
'@

foreach ($file in $collectionFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace [regex]::Escape($oldNav), $newNav
        Set-Content $file $content -NoNewline
        Write-Host "Updated navigation in $file"
    }
}

Write-Host "Navigation update complete!"