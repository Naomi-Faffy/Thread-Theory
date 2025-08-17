# PowerShell script to generate all collection pages

$collections = @(
    @{Name="Shrugs"; Description="Elegant layering pieces that add sophistication to any outfit. Perfect for transitional seasons and versatile styling."; Items=@("Shrug 1", "Shrug 2", "Shrug 3", "Shrug 4", "Shrug 5", "Shrug 6"); Prices=@("$69.99", "$79.99", "$89.99", "$74.99", "$84.99", "$94.99")},
    @{Name="Skirts"; Description="Handcrafted knit and crochet skirts that celebrate feminine elegance. From casual to formal, find your perfect fit."; Items=@("Skirt 1", "Skirt 2", "Skirt 3", "Skirt 4", "Skirt 5", "Skirt 6"); Prices=@("$89.99", "$99.99", "$79.99", "$109.99", "$94.99", "$119.99")},
    @{Name="Tops"; Description="Versatile knit and crochet tops designed for comfort and style. Perfect for layering or wearing on their own."; Items=@("Top 1", "Top 2", "Top 3", "Top 4", "Top 5", "Top 6"); Prices=@("$59.99", "$69.99", "$64.99", "$74.99", "$79.99", "$84.99")},
    @{Name="Shorts"; Description="Comfortable summer essentials crafted with breathable materials. Perfect for warm weather and casual occasions."; Items=@("Shorts 1", "Shorts 2", "Shorts 3", "Shorts 4", "Shorts 5", "Shorts 6"); Prices=@("$49.99", "$54.99", "$59.99", "$64.99", "$69.99", "$74.99")},
    @{Name="Bags"; Description="Handcrafted crochet bags that combine functionality with style. From everyday totes to evening clutches."; Items=@("Bag 1", "Bag 2", "Bag 3", "Bag 4", "Bag 5", "Bag 6"); Prices=@("$39.99", "$49.99", "$59.99", "$69.99", "$79.99", "$89.99")},
    @{Name="Jumpsuits"; Description="Stylish one-piece wonders that make dressing effortless. Perfect for any occasion with minimal styling required."; Items=@("Jumpsuit 1", "Jumpsuit 2", "Jumpsuit 3", "Jumpsuit 4", "Jumpsuit 5", "Jumpsuit 6"); Prices=@("$159.99", "$179.99", "$199.99", "$169.99", "$189.99", "$219.99")},
    @{Name="Two Piece"; Description="Coordinated sets and ensembles that take the guesswork out of styling. Mix and match for versatile looks."; Items=@("Set 1", "Set 2", "Set 3", "Set 4", "Set 5", "Set 6"); Prices=@("$129.99", "$149.99", "$139.99", "$159.99", "$169.99", "$179.99")},
    @{Name="Bottoms"; Description="Comfortable pants, leggings, and more crafted for everyday wear. Designed for movement and all-day comfort."; Items=@("Bottom 1", "Bottom 2", "Bottom 3", "Bottom 4", "Bottom 5", "Bottom 6"); Prices=@("$79.99", "$89.99", "$94.99", "$99.99", "$104.99", "$109.99")},
    @{Name="Hats"; Description="Stylish headwear collection featuring knit and crochet designs. From beanies to sun hats, complete your look."; Items=@("Hat 1", "Hat 2", "Hat 3", "Hat 4", "Hat 5", "Hat 6"); Prices=@("$29.99", "$34.99", "$39.99", "$44.99", "$49.99", "$54.99")},
    @{Name="Accessories"; Description="Beautiful scarves, belts, and accessories to complement your wardrobe. The perfect finishing touches."; Items=@("Accessory 1", "Accessory 2", "Accessory 3", "Accessory 4", "Accessory 5", "Accessory 6"); Prices=@("$24.99", "$29.99", "$34.99", "$39.99", "$44.99", "$49.99")},
    @{Name="Shoes"; Description="Handcrafted footwear that combines comfort with unique design. From slippers to statement pieces."; Items=@("Shoe 1", "Shoe 2", "Shoe 3", "Shoe 4", "Shoe 5", "Shoe 6"); Prices=@("$89.99", "$99.99", "$109.99", "$119.99", "$129.99", "$139.99")},
    @{Name="Hair"; Description="Beautiful hair accessories including headbands, scrunchies, and decorative pieces. Add elegance to your hairstyle."; Items=@("Hair Accessory 1", "Hair Accessory 2", "Hair Accessory 3", "Hair Accessory 4", "Hair Accessory 5", "Hair Accessory 6"); Prices=@("$19.99", "$24.99", "$29.99", "$34.99", "$39.99", "$44.99")},
    @{Name="Jewellery"; Description="Handcrafted jewelry pieces that complement your style. From delicate to statement pieces, find your perfect match."; Items=@("Jewelry 1", "Jewelry 2", "Jewelry 3", "Jewelry 4", "Jewelry 5", "Jewelry 6"); Prices=@("$34.99", "$44.99", "$54.99", "$64.99", "$74.99", "$84.99")}
)

foreach ($collection in $collections) {
    $fileName = $collection.Name.ToLower() -replace " ", "-"
    $fileName = "$fileName.html"
    
    $productItems = ""
    for ($i = 0; $i -lt 6; $i++) {
        $productItems += @"
                <!-- Product $($i + 1) -->
                <div class="product-item">
                    <div class="product-image">
                        <div class="image-placeholder">
                            <p>$($collection.Items[$i])</p>
                            <span class="placeholder-text">Your image will go here</span>
                        </div>
                        <div class="product-overlay">
                            <button class="quick-view-btn">Quick View</button>
                            <button class="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">$($collection.Items[$i])</h3>
                        <p class="product-price">$($collection.Prices[$i])</p>
                    </div>
                </div>

"@
    }

    $htmlContent = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$($collection.Name) Collection - Thread Theory</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="collection-styles.css">
</head>
<body>
    <!-- Floating Background Bubbles -->
    <div class="floating-bubbles">
        <div class="bubble bubble-1"></div>
        <div class="bubble bubble-2"></div>
        <div class="bubble bubble-3"></div>
        <div class="bubble bubble-4"></div>
        <div class="bubble bubble-5"></div>
        <div class="bubble bubble-6"></div>
    </div>

    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="index.html">
                    <img src="logo.png" alt="Thread Theory Logo" class="logo-img">
                </a>
            </div>
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
            <div class="hamburger" id="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <!-- Collection Header -->
    <section class="collection-header">
        <div class="container">
            <div class="collection-header-content">
                <h1 class="collection-title">$($collection.Name) Collection</h1>
                <p class="collection-description">$($collection.Description)</p>
                <div class="breadcrumb">
                    <a href="index.html">Home</a> / <a href="index.html#collections">Collections</a> / <span>$($collection.Name)</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Collection Gallery -->
    <section class="collection-gallery">
        <div class="container">
            <div class="gallery-grid">
$productItems
            </div>
        </div>
    </section>

    <!-- Back to Collections -->
    <section class="back-to-collections">
        <div class="container">
            <a href="index.html#collections" class="back-btn">← Back to All Collections</a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <h3>Thread Theory</h3>
                    <p>Crafting stories, one stitch at a time.</p>
                </div>
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Collections</h4>
                        <ul>
                            <li><a href="jerseys.html">Jerseys</a></li>
                            <li><a href="dresses.html">Dresses</a></li>
                            <li><a href="tops.html">Tops</a></li>
                            <li><a href="bags.html">Bags</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>About</h4>
                        <ul>
                            <li><a href="index.html#about">Our Story</a></li>
                            <li><a href="#">Sustainability</a></li>
                            <li><a href="#">Care Guide</a></li>
                            <li><a href="#">Size Guide</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="index.html#contact">Contact Us</a></li>
                            <li><a href="#">Shipping</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Thread Theory. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="collection-script.js"></script>
</body>
</html>
"@

    $htmlContent | Out-File -FilePath $fileName -Encoding UTF8
    Write-Host "Generated $fileName"
}

Write-Host "All collection pages generated successfully!"
"@