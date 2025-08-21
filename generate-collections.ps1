# Collection data with descriptions and products
$collections = @{
    "Jerseys" = @{
        "description" = "Comfortable and stylish knit jerseys perfect for casual wear and layering. Each jersey combines warmth with breathability for all-day comfort."
        "products" = @(
            @{ name = "Classic Knit Jersey"; price = "$89.99"; placeholder = "Jersey 1" },
            @{ name = "Striped Casual Jersey"; price = "$94.99"; placeholder = "Jersey 2" },
            @{ name = "Oversized Comfort Jersey"; price = "$99.99"; placeholder = "Jersey 3" },
            @{ name = "Fitted Athletic Jersey"; price = "$84.99"; placeholder = "Jersey 4" },
            @{ name = "Vintage Style Jersey"; price = "$109.99"; placeholder = "Jersey 5" },
            @{ name = "Modern Cut Jersey"; price = "$89.99"; placeholder = "Jersey 6" }
        )
    }
    "Dresses" = @{
        "description" = "Beautiful handmade dresses that combine elegance with comfort. Each dress is carefully crafted to celebrate your unique style and personality."
        "products" = @(
            @{ name = "Elegant Knit Dress"; price = "$149.99"; placeholder = "Dress 1" },
            @{ name = "Bohemian Crochet Dress"; price = "$169.99"; placeholder = "Dress 2" },
            @{ name = "Summer Midi Dress"; price = "$134.99"; placeholder = "Dress 3" },
            @{ name = "Vintage Lace Dress"; price = "$189.99"; placeholder = "Dress 4" },
            @{ name = "Casual Day Dress"; price = "$124.99"; placeholder = "Dress 5" },
            @{ name = "Evening Maxi Dress"; price = "$199.99"; placeholder = "Dress 6" }
        )
    }
    "Tops" = @{
        "description" = "Versatile and stylish tops that effortlessly transition from day to night. Handcrafted with premium yarns for lasting comfort and style."
        "products" = @(
            @{ name = "Cropped Crochet Top"; price = "$69.99"; placeholder = "Top 1" },
            @{ name = "Flowy Bohemian Blouse"; price = "$79.99"; placeholder = "Top 2" },
            @{ name = "Fitted Tank Top"; price = "$54.99"; placeholder = "Top 3" },
            @{ name = "Off-Shoulder Top"; price = "$74.99"; placeholder = "Top 4" },
            @{ name = "Lace Detail Blouse"; price = "$84.99"; placeholder = "Top 5" },
            @{ name = "Casual Knit Sweater"; price = "$89.99"; placeholder = "Top 6" }
        )
    }
    "Bottoms" = @{
        "description" = "Comfortable and fashionable bottoms including skirts, pants, and shorts. Each piece is designed for both style and everyday wearability."
        "products" = @(
            @{ name = "High-Waisted Skirt"; price = "$79.99"; placeholder = "Bottom 1" },
            @{ name = "Crochet Wide-Leg Pants"; price = "$94.99"; placeholder = "Bottom 2" },
            @{ name = "A-Line Mini Skirt"; price = "$69.99"; placeholder = "Bottom 3" },
            @{ name = "Flowy Maxi Skirt"; price = "$89.99"; placeholder = "Bottom 4" },
            @{ name = "Fitted Pencil Skirt"; price = "$74.99"; placeholder = "Bottom 5" },
            @{ name = "Casual Jogger Pants"; price = "$84.99"; placeholder = "Bottom 6" }
        )
    }
    "Accessories" = @{
        "description" = "Complete your look with our handcrafted accessories. From bags to jewelry, each piece adds the perfect finishing touch to any outfit."
        "products" = @(
            @{ name = "Crochet Shoulder Bag"; price = "$49.99"; placeholder = "Accessory 1" },
            @{ name = "Beaded Statement Necklace"; price = "$34.99"; placeholder = "Accessory 2" },
            @{ name = "Knit Headband"; price = "$24.99"; placeholder = "Accessory 3" },
            @{ name = "Woven Belt"; price = "$29.99"; placeholder = "Accessory 4" },
            @{ name = "Crochet Earrings"; price = "$19.99"; placeholder = "Accessory 5" },
            @{ name = "Textured Scarf"; price = "$39.99"; placeholder = "Accessory 6" }
        )
    }
    "Bags" = @{
        "description" = "Stylish and functional handcrafted bags for every occasion. From everyday totes to evening clutches, each bag combines beauty with practicality."
        "products" = @(
            @{ name = "Large Tote Bag"; price = "$79.99"; placeholder = "Bag 1" },
            @{ name = "Crossbody Messenger"; price = "$64.99"; placeholder = "Bag 2" },
            @{ name = "Evening Clutch"; price = "$44.99"; placeholder = "Bag 3" },
            @{ name = "Backpack Style Bag"; price = "$89.99"; placeholder = "Bag 4" },
            @{ name = "Mini Shoulder Bag"; price = "$54.99"; placeholder = "Bag 5" },
            @{ name = "Beach Tote"; price = "$69.99"; placeholder = "Bag 6" }
        )
    }
    "Hats" = @{
        "description" = "Stylish headwear that combines fashion with function. From sun hats to beanies, each piece is crafted to complement your personal style."
        "products" = @(
            @{ name = "Wide Brim Sun Hat"; price = "$39.99"; placeholder = "Hat 1" },
            @{ name = "Cozy Winter Beanie"; price = "$29.99"; placeholder = "Hat 2" },
            @{ name = "Vintage Cloche Hat"; price = "$44.99"; placeholder = "Hat 3" },
            @{ name = "Baseball Cap Style"; price = "$34.99"; placeholder = "Hat 4" },
            @{ name = "Beret Style Hat"; price = "$37.99"; placeholder = "Hat 5" },
            @{ name = "Bucket Hat"; price = "$32.99"; placeholder = "Hat 6" }
        )
    }
    "Shoes" = @{
        "description" = "Comfortable and stylish footwear handcrafted with care. From casual slippers to elegant flats, each pair combines comfort with artisanal beauty."
        "products" = @(
            @{ name = "Crochet Ballet Flats"; price = "$59.99"; placeholder = "Shoe 1" },
            @{ name = "Cozy House Slippers"; price = "$34.99"; placeholder = "Shoe 2" },
            @{ name = "Summer Sandals"; price = "$49.99"; placeholder = "Shoe 3" },
            @{ name = "Ankle Boots"; price = "$79.99"; placeholder = "Shoe 4" },
            @{ name = "Espadrille Style"; price = "$54.99"; placeholder = "Shoe 5" },
            @{ name = "Mary Jane Flats"; price = "$64.99"; placeholder = "Shoe 6" }
        )
    }
    "Jewellery" = @{
        "description" = "Unique handcrafted jewelry pieces that add elegance to any outfit. Each piece is carefully designed to be both beautiful and meaningful."
        "products" = @(
            @{ name = "Statement Necklace"; price = "$44.99"; placeholder = "Jewelry 1" },
            @{ name = "Delicate Bracelet Set"; price = "$29.99"; placeholder = "Jewelry 2" },
            @{ name = "Bohemian Earrings"; price = "$24.99"; placeholder = "Jewelry 3" },
            @{ name = "Vintage Ring"; price = "$34.99"; placeholder = "Jewelry 4" },
            @{ name = "Layered Chain Necklace"; price = "$39.99"; placeholder = "Jewelry 5" },
            @{ name = "Charm Bracelet"; price = "$32.99"; placeholder = "Jewelry 6" }
        )
    }
    "Hair" = @{
        "description" = "Beautiful hair accessories that add the perfect finishing touch. From headbands to hair ties, each piece combines function with style."
        "products" = @(
            @{ name = "Crochet Headband"; price = "$24.99"; placeholder = "Hair 1" },
            @{ name = "Silk Hair Scrunchie"; price = "$14.99"; placeholder = "Hair 2" },
            @{ name = "Decorative Hair Clip"; price = "$19.99"; placeholder = "Hair 3" },
            @{ name = "Braided Hair Tie"; price = "$12.99"; placeholder = "Hair 4" },
            @{ name = "Flower Hair Pin"; price = "$16.99"; placeholder = "Hair 5" },
            @{ name = "Vintage Hair Comb"; price = "$22.99"; placeholder = "Hair 6" }
        )
    }
    "Shorts" = @{
        "description" = "Comfortable and stylish shorts perfect for warm weather. Each pair is crafted with breathable materials for all-day comfort and style."
        "products" = @(
            @{ name = "High-Waisted Shorts"; price = "$54.99"; placeholder = "Shorts 1" },
            @{ name = "Crochet Lace Shorts"; price = "$49.99"; placeholder = "Shorts 2" },
            @{ name = "Casual Denim Style"; price = "$59.99"; placeholder = "Shorts 3" },
            @{ name = "Flowy Summer Shorts"; price = "$44.99"; placeholder = "Shorts 4" },
            @{ name = "Athletic Style Shorts"; price = "$39.99"; placeholder = "Shorts 5" },
            @{ name = "Vintage Inspired Shorts"; price = "$52.99"; placeholder = "Shorts 6" }
        )
    }
    "Skirts" = @{
        "description" = "Elegant and versatile skirts that flatter every figure. From mini to maxi, each skirt is designed to make you feel confident and beautiful."
        "products" = @(
            @{ name = "A-Line Midi Skirt"; price = "$69.99"; placeholder = "Skirt 1" },
            @{ name = "Flowy Maxi Skirt"; price = "$79.99"; placeholder = "Skirt 2" },
            @{ name = "Pencil Skirt"; price = "$64.99"; placeholder = "Skirt 3" },
            @{ name = "Pleated Mini Skirt"; price = "$54.99"; placeholder = "Skirt 4" },
            @{ name = "Wrap Style Skirt"; price = "$59.99"; placeholder = "Skirt 5" },
            @{ name = "Tiered Bohemian Skirt"; price = "$74.99"; placeholder = "Skirt 6" }
        )
    }
    "Shrugs" = @{
        "description" = "Versatile layering pieces that add warmth and style to any outfit. Perfect for transitional weather and elegant occasions."
        "products" = @(
            @{ name = "Lace Shrug"; price = "$49.99"; placeholder = "Shrug 1" },
            @{ name = "Cropped Cardigan"; price = "$59.99"; placeholder = "Shrug 2" },
            @{ name = "Bolero Style Shrug"; price = "$44.99"; placeholder = "Shrug 3" },
            @{ name = "Open Front Shrug"; price = "$54.99"; placeholder = "Shrug 4" },
            @{ name = "Vintage Inspired Shrug"; price = "$52.99"; placeholder = "Shrug 5" },
            @{ name = "Textured Knit Shrug"; price = "$57.99"; placeholder = "Shrug 6" }
        )
    }
    "Jumpsuits" = @{
        "description" = "Effortlessly chic one-piece outfits that make a statement. Each jumpsuit combines comfort with sophisticated style for any occasion."
        "products" = @(
            @{ name = "Wide-Leg Jumpsuit"; price = "$129.99"; placeholder = "Jumpsuit 1" },
            @{ name = "Fitted Romper"; price = "$89.99"; placeholder = "Jumpsuit 2" },
            @{ name = "Bohemian Jumpsuit"; price = "$119.99"; placeholder = "Jumpsuit 3" },
            @{ name = "Casual Overall Style"; price = "$99.99"; placeholder = "Jumpsuit 4" },
            @{ name = "Evening Jumpsuit"; price = "$149.99"; placeholder = "Jumpsuit 5" },
            @{ name = "Cropped Leg Jumpsuit"; price = "$109.99"; placeholder = "Jumpsuit 6" }
        )
    }
    "Two-piece" = @{
        "description" = "Coordinated sets that take the guesswork out of styling. Each two-piece set is designed to work together perfectly while offering versatile mix-and-match options."
        "products" = @(
            @{ name = "Crop Top & Skirt Set"; price = "$119.99"; placeholder = "Two-piece 1" },
            @{ name = "Matching Cardigan Set"; price = "$134.99"; placeholder = "Two-piece 2" },
            @{ name = "Shorts & Top Combo"; price = "$99.99"; placeholder = "Two-piece 3" },
            @{ name = "Blazer & Pants Set"; price = "$159.99"; placeholder = "Two-piece 4" },
            @{ name = "Knit Top & Bottom Set"; price = "$109.99"; placeholder = "Two-piece 5" },
            @{ name = "Vintage Inspired Set"; price = "$124.99"; placeholder = "Two-piece 6" }
        )
    }
    "Men" = @{
        "description" = "Sophisticated menswear that redefines masculine style with comfort and contemporary elegance. Each piece is crafted for the modern gentleman."
        "products" = @(
            @{ name = "Classic Polo Shirt"; price = "$79.99"; placeholder = "Men 1" },
            @{ name = "Knit Sweater"; price = "$99.99"; placeholder = "Men 2" },
            @{ name = "Casual Button-Up"; price = "$89.99"; placeholder = "Men 3" },
            @{ name = "Textured Vest"; price = "$69.99"; placeholder = "Men 4" },
            @{ name = "Cardigan Jacket"; price = "$119.99"; placeholder = "Men 5" },
            @{ name = "Henley Style Shirt"; price = "$74.99"; placeholder = "Men 6" }
        )
    }
}

# Read template
$template = Get-Content "collection-template.html" -Raw

foreach ($collectionName in $collections.Keys) {
    $collectionData = $collections[$collectionName]
    $fileName = $collectionName.ToLower() + ".html"
    
    # Generate products HTML
    $productsHtml = ""
    for ($i = 0; $i -lt $collectionData.products.Count; $i++) {
        $product = $collectionData.products[$i]
        $productsHtml += @"
                <!-- Product $($i + 1) -->
                <div class="product-item">
                    <div class="product-image">
                        <div class="image-placeholder">
                            <p>$($product.placeholder)</p>
                            <span class="placeholder-text">Your image will go here</span>
                        </div>
                        <div class="product-overlay">
                            <button class="quick-view-btn">Quick View</button>
                            <button class="add-to-cart-btn" onclick="addToCart('$($product.name)', '$($product.price)', '$($product.placeholder)')">Add to Cart</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">$($product.name)</h3>
                        <p class="product-price">$($product.price)</p>
                    </div>
                </div>

"@
    }
    
    # Replace placeholders in template
    $content = $template -replace "{{COLLECTION_NAME}}", $collectionName
    $content = $content -replace "{{COLLECTION_DESCRIPTION}}", $collectionData.description
    $content = $content -replace "{{PRODUCTS}}", $productsHtml
    
    # Write file
    Set-Content $fileName $content -NoNewline
    Write-Host "Generated $fileName"
}

Write-Host "All collection pages generated successfully!"