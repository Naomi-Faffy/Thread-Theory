# Fix collection pages - capitalize navigation, fix sizes, remove placeholder text

$collectionFiles = @(
    "accessories.html", "bags.html", "bottoms.html", "customization.html", 
    "dresses.html", "hair.html", "hats.html", "home.html", "jerseys.html", 
    "jewellery.html", "jumpsuits.html", "men.html", "shirts.html", "shoes.html", 
    "shorts.html", "shrugs.html", "skirts.html", "tops.html", "two-piece.html"
)

foreach ($file in $collectionFiles) {
    $filePath = "c:\Users\User\OneDrive\Documents\ThreadTheory\$file"
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Fix navigation - capitalize CART and ACCOUNT
        $content = $content -replace '<a href="cart\.html" class="nav-link">Cart</a>', '<a href="cart.html" class="nav-link">CART <span id="cart-count">(0)</span></a>'
        $content = $content -replace '<a href="account\.html" class="nav-link">Account</a>', '<a href="account.html" class="nav-link">ACCOUNT</a>'
        
        # Update sizes to include XS to 2XL
        # Replace S, M, L, XL, XXL patterns with full range
        $content = $content -replace "<span class='option-item'>S</span><span class='option-item'>M</span><span class='option-item'>L</span><span class='option-item'>XL</span><span class='option-item'>XXL</span>", 
                                     "<span class='option-item'>XS</span><span class='option-item'>S</span><span class='option-item'>M</span><span class='option-item'>L</span><span class='option-item'>XL</span><span class='option-item'>2XL</span>"
        
        # Also replace patterns missing XS
        $content = $content -replace "<span class='option-item'>XS</span><span class='option-item'>S</span><span class='option-item'>M</span><span class='option-item'>L</span><span class='option-item'>XL</span><span class='option-item'>XXL</span>", 
                                     "<span class='option-item'>XS</span><span class='option-item'>S</span><span class='option-item'>M</span><span class='option-item'>L</span><span class='option-item'>XL</span><span class='option-item'>2XL</span>"
        
        # Remove "Your image will go here" text - make it just show the collection name or nothing
        $content = $content -replace '<span class="placeholder-text">Your image will go here</span>', ''
        
        # Update placeholder to not show text
        $content = $content -replace '<div class="image-placeholder">\s*<p>.*?</p>', '<div class="image-placeholder">'
        $content = $content -replace '<div class="image-placeholder">\s*<span.*?>.*?</span>', '<div class="image-placeholder">'
        
        Set-Content $filePath $content -NoNewline
        Write-Host "Updated $file"
    }
}

Write-Host "Collection pages updated successfully!"
