# Collection data with simplified structure and sizes/colors
$collections = @{
    "Jerseys" = @{
        "products" = @(
            @{ name = "Classic Knit Jersey"; price = "$89.99"; placeholder = "Jersey 1"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Cream", "Sage", "Dusty Rose") },
            @{ name = "Striped Casual Jersey"; price = "$94.99"; placeholder = "Jersey 2"; sizes = @("S", "M", "L", "XL"); colors = @("Navy/White", "Black/Gray", "Pink/Cream") },
            @{ name = "Oversized Comfort Jersey"; price = "$99.99"; placeholder = "Jersey 3"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Charcoal", "Beige", "Lavender") },
            @{ name = "Fitted Athletic Jersey"; price = "$84.99"; placeholder = "Jersey 4"; sizes = @("XS", "S", "M", "L"); colors = @("Black", "White", "Navy") },
            @{ name = "Vintage Style Jersey"; price = "$109.99"; placeholder = "Jersey 5"; sizes = @("S", "M", "L", "XL"); colors = @("Mustard", "Rust", "Forest Green") },
            @{ name = "Modern Cut Jersey"; price = "$89.99"; placeholder = "Jersey 6"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Blush", "Stone", "Midnight") }
        )
    }
    "Dresses" = @{
        "products" = @(
            @{ name = "Elegant Knit Dress"; price = "$149.99"; placeholder = "Dress 1"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Dusty Rose", "Sage", "Cream") },
            @{ name = "Bohemian Crochet Dress"; price = "$169.99"; placeholder = "Dress 2"; sizes = @("S", "M", "L", "XL"); colors = @("Terracotta", "Olive", "Ivory") },
            @{ name = "Summer Midi Dress"; price = "$134.99"; placeholder = "Dress 3"; sizes = @("XS", "S", "M", "L"); colors = @("Coral", "Mint", "Lavender") },
            @{ name = "Vintage Lace Dress"; price = "$189.99"; placeholder = "Dress 4"; sizes = @("S", "M", "L", "XL"); colors = @("Champagne", "Blush", "Pearl") },
            @{ name = "Casual Day Dress"; price = "$124.99"; placeholder = "Dress 5"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Navy", "Burgundy", "Forest") },
            @{ name = "Evening Maxi Dress"; price = "$199.99"; placeholder = "Dress 6"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Black", "Midnight Blue", "Deep Purple") }
        )
    }
    "Tops" = @{
        "products" = @(
            @{ name = "Cropped Crochet Top"; price = "$69.99"; placeholder = "Top 1"; sizes = @("XS", "S", "M", "L"); colors = @("White", "Peach", "Mint") },
            @{ name = "Flowy Bohemian Blouse"; price = "$79.99"; placeholder = "Top 2"; sizes = @("S", "M", "L", "XL"); colors = @("Rust", "Sage", "Cream") },
            @{ name = "Fitted Tank Top"; price = "$54.99"; placeholder = "Top 3"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Black", "White", "Gray") },
            @{ name = "Off-Shoulder Top"; price = "$74.99"; placeholder = "Top 4"; sizes = @("S", "M", "L", "XL"); colors = @("Blush", "Lavender", "Sage") },
            @{ name = "Lace Detail Blouse"; price = "$84.99"; placeholder = "Top 5"; sizes = @("XS", "S", "M", "L"); colors = @("Ivory", "Dusty Rose", "Champagne") },
            @{ name = "Casual Knit Sweater"; price = "$89.99"; placeholder = "Top 6"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Oatmeal", "Camel", "Charcoal") }
        )
    }
    "Bottoms" = @{
        "products" = @(
            @{ name = "High-Waisted Skirt"; price = "$79.99"; placeholder = "Bottom 1"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Black", "Navy", "Camel") },
            @{ name = "Crochet Wide-Leg Pants"; price = "$94.99"; placeholder = "Bottom 2"; sizes = @("S", "M", "L", "XL"); colors = @("Cream", "Sage", "Terracotta") },
            @{ name = "A-Line Mini Skirt"; price = "$69.99"; placeholder = "Bottom 3"; sizes = @("XS", "S", "M", "L"); colors = @("Denim", "Khaki", "Burgundy") },
            @{ name = "Flowy Maxi Skirt"; price = "$89.99"; placeholder = "Bottom 4"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Floral Print", "Solid Black", "Rust") },
            @{ name = "Fitted Pencil Skirt"; price = "$74.99"; placeholder = "Bottom 5"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Black", "Gray", "Navy") },
            @{ name = "Casual Jogger Pants"; price = "$84.99"; placeholder = "Bottom 6"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Heather Gray", "Black", "Olive") }
        )
    }
    "Accessories" = @{
        "products" = @(
            @{ name = "Crochet Shoulder Bag"; price = "$49.99"; placeholder = "Accessory 1"; sizes = @("One Size"); colors = @("Natural", "Black", "Sage") },
            @{ name = "Beaded Statement Necklace"; price = "$34.99"; placeholder = "Accessory 2"; sizes = @("One Size"); colors = @("Gold", "Silver", "Rose Gold") },
            @{ name = "Knit Headband"; price = "$24.99"; placeholder = "Accessory 3"; sizes = @("One Size"); colors = @("Cream", "Blush", "Gray") },
            @{ name = "Woven Belt"; price = "$29.99"; placeholder = "Accessory 4"; sizes = @("S", "M", "L"); colors = @("Brown", "Black", "Tan") },
            @{ name = "Crochet Earrings"; price = "$19.99"; placeholder = "Accessory 5"; sizes = @("One Size"); colors = @("White", "Coral", "Mint") },
            @{ name = "Textured Scarf"; price = "$39.99"; placeholder = "Accessory 6"; sizes = @("One Size"); colors = @("Burgundy", "Navy", "Cream") }
        )
    }
    "Bags" = @{
        "products" = @(
            @{ name = "Large Tote Bag"; price = "$79.99"; placeholder = "Bag 1"; sizes = @("One Size"); colors = @("Natural", "Black", "Navy") },
            @{ name = "Crossbody Messenger"; price = "$64.99"; placeholder = "Bag 2"; sizes = @("One Size"); colors = @("Brown", "Sage", "Burgundy") },
            @{ name = "Evening Clutch"; price = "$44.99"; placeholder = "Bag 3"; sizes = @("One Size"); colors = @("Black", "Gold", "Silver") },
            @{ name = "Backpack Style Bag"; price = "$89.99"; placeholder = "Bag 4"; sizes = @("One Size"); colors = @("Charcoal", "Olive", "Cream") },
            @{ name = "Mini Shoulder Bag"; price = "$54.99"; placeholder = "Bag 5"; sizes = @("One Size"); colors = @("Blush", "Sage", "Black") },
            @{ name = "Beach Tote"; price = "$69.99"; placeholder = "Bag 6"; sizes = @("One Size"); colors = @("Natural", "Coral", "Mint") }
        )
    }
    "Hats" = @{
        "products" = @(
            @{ name = "Wide Brim Sun Hat"; price = "$39.99"; placeholder = "Hat 1"; sizes = @("One Size"); colors = @("Natural", "Black", "Sage") },
            @{ name = "Cozy Winter Beanie"; price = "$29.99"; placeholder = "Hat 2"; sizes = @("One Size"); colors = @("Charcoal", "Cream", "Burgundy") },
            @{ name = "Vintage Cloche Hat"; price = "$44.99"; placeholder = "Hat 3"; sizes = @("One Size"); colors = @("Black", "Navy", "Camel") },
            @{ name = "Baseball Cap Style"; price = "$34.99"; placeholder = "Hat 4"; sizes = @("One Size"); colors = @("Denim", "Black", "Khaki") },
            @{ name = "Beret Style Hat"; price = "$37.99"; placeholder = "Hat 5"; sizes = @("One Size"); colors = @("Black", "Burgundy", "Gray") },
            @{ name = "Bucket Hat"; price = "$32.99"; placeholder = "Hat 6"; sizes = @("One Size"); colors = @("Khaki", "Black", "Denim") }
        )
    }
    "Shoes" = @{
        "products" = @(
            @{ name = "Crochet Ballet Flats"; price = "$59.99"; placeholder = "Shoe 1"; sizes = @("6", "7", "8", "9", "10"); colors = @("Nude", "Black", "Sage") },
            @{ name = "Cozy House Slippers"; price = "$34.99"; placeholder = "Shoe 2"; sizes = @("6", "7", "8", "9", "10", "11"); colors = @("Cream", "Gray", "Blush") },
            @{ name = "Summer Sandals"; price = "$49.99"; placeholder = "Shoe 3"; sizes = @("6", "7", "8", "9", "10"); colors = @("Natural", "Black", "Tan") },
            @{ name = "Ankle Boots"; price = "$79.99"; placeholder = "Shoe 4"; sizes = @("6", "7", "8", "9", "10", "11"); colors = @("Brown", "Black", "Gray") },
            @{ name = "Espadrille Style"; price = "$54.99"; placeholder = "Shoe 5"; sizes = @("6", "7", "8", "9", "10"); colors = @("Natural", "Navy", "Red") },
            @{ name = "Mary Jane Flats"; price = "$64.99"; placeholder = "Shoe 6"; sizes = @("6", "7", "8", "9", "10"); colors = @("Black", "Brown", "Navy") }
        )
    }
    "Jewellery" = @{
        "products" = @(
            @{ name = "Statement Necklace"; price = "$44.99"; placeholder = "Jewelry 1"; sizes = @("One Size"); colors = @("Gold", "Silver", "Rose Gold") },
            @{ name = "Delicate Bracelet Set"; price = "$29.99"; placeholder = "Jewelry 2"; sizes = @("One Size"); colors = @("Gold", "Silver", "Mixed Metals") },
            @{ name = "Bohemian Earrings"; price = "$24.99"; placeholder = "Jewelry 3"; sizes = @("One Size"); colors = @("Turquoise", "Coral", "Amber") },
            @{ name = "Vintage Ring"; price = "$34.99"; placeholder = "Jewelry 4"; sizes = @("6", "7", "8", "9"); colors = @("Gold", "Silver", "Antique Brass") },
            @{ name = "Layered Chain Necklace"; price = "$39.99"; placeholder = "Jewelry 5"; sizes = @("One Size"); colors = @("Gold", "Silver", "Rose Gold") },
            @{ name = "Charm Bracelet"; price = "$32.99"; placeholder = "Jewelry 6"; sizes = @("One Size"); colors = @("Silver", "Gold", "Mixed") }
        )
    }
    "Hair" = @{
        "products" = @(
            @{ name = "Crochet Headband"; price = "$24.99"; placeholder = "Hair 1"; sizes = @("One Size"); colors = @("Cream", "Blush", "Sage") },
            @{ name = "Silk Hair Scrunchie"; price = "$14.99"; placeholder = "Hair 2"; sizes = @("One Size"); colors = @("Blush", "Sage", "Lavender") },
            @{ name = "Decorative Hair Clip"; price = "$19.99"; placeholder = "Hair 3"; sizes = @("One Size"); colors = @("Gold", "Silver", "Rose Gold") },
            @{ name = "Braided Hair Tie"; price = "$12.99"; placeholder = "Hair 4"; sizes = @("One Size"); colors = @("Natural", "Black", "Brown") },
            @{ name = "Flower Hair Pin"; price = "$16.99"; placeholder = "Hair 5"; sizes = @("One Size"); colors = @("White", "Blush", "Coral") },
            @{ name = "Vintage Hair Comb"; price = "$22.99"; placeholder = "Hair 6"; sizes = @("One Size"); colors = @("Tortoiseshell", "Black", "Pearl") }
        )
    }
    "Shorts" = @{
        "products" = @(
            @{ name = "High-Waisted Shorts"; price = "$54.99"; placeholder = "Shorts 1"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Denim", "Black", "Khaki") },
            @{ name = "Crochet Lace Shorts"; price = "$49.99"; placeholder = "Shorts 2"; sizes = @("S", "M", "L", "XL"); colors = @("White", "Cream", "Blush") },
            @{ name = "Casual Denim Style"; price = "$59.99"; placeholder = "Shorts 3"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Light Wash", "Dark Wash", "Black") },
            @{ name = "Flowy Summer Shorts"; price = "$44.99"; placeholder = "Shorts 4"; sizes = @("S", "M", "L", "XL"); colors = @("Coral", "Mint", "Lavender") },
            @{ name = "Athletic Style Shorts"; price = "$39.99"; placeholder = "Shorts 5"; sizes = @("XS", "S", "M", "L", "XL", "XXL"); colors = @("Black", "Gray", "Navy") },
            @{ name = "Vintage Inspired Shorts"; price = "$52.99"; placeholder = "Shorts 6"; sizes = @("S", "M", "L", "XL"); colors = @("Rust", "Sage", "Mustard") }
        )
    }
    "Skirts" = @{
        "products" = @(
            @{ name = "A-Line Midi Skirt"; price = "$69.99"; placeholder = "Skirt 1"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Black", "Navy", "Burgundy") },
            @{ name = "Flowy Maxi Skirt"; price = "$79.99"; placeholder = "Skirt 2"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Floral", "Solid Black", "Rust") },
            @{ name = "Pencil Skirt"; price = "$64.99"; placeholder = "Skirt 3"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Black", "Gray", "Navy") },
            @{ name = "Pleated Mini Skirt"; price = "$54.99"; placeholder = "Skirt 4"; sizes = @("XS", "S", "M", "L"); colors = @("Plaid", "Black", "Navy") },
            @{ name = "Wrap Style Skirt"; price = "$59.99"; placeholder = "Skirt 5"; sizes = @("S", "M", "L", "XL"); colors = @("Sage", "Terracotta", "Black") },
            @{ name = "Tiered Bohemian Skirt"; price = "$74.99"; placeholder = "Skirt 6"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Cream", "Rust", "Forest") }
        )
    }
    "Shrugs" = @{
        "products" = @(
            @{ name = "Lace Shrug"; price = "$49.99"; placeholder = "Shrug 1"; sizes = @("S", "M", "L", "XL"); colors = @("White", "Ivory", "Blush") },
            @{ name = "Cropped Cardigan"; price = "$59.99"; placeholder = "Shrug 2"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Sage", "Cream", "Gray") },
            @{ name = "Bolero Style Shrug"; price = "$44.99"; placeholder = "Shrug 3"; sizes = @("S", "M", "L", "XL"); colors = @("Black", "Navy", "Burgundy") },
            @{ name = "Open Front Shrug"; price = "$54.99"; placeholder = "Shrug 4"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Oatmeal", "Charcoal", "Dusty Rose") },
            @{ name = "Vintage Inspired Shrug"; price = "$52.99"; placeholder = "Shrug 5"; sizes = @("XS", "S", "M", "L"); colors = @("Mustard", "Forest", "Rust") },
            @{ name = "Textured Knit Shrug"; price = "$57.99"; placeholder = "Shrug 6"; sizes = @("S", "M", "L", "XL"); colors = @("Cream", "Sage", "Lavender") }
        )
    }
    "Jumpsuits" = @{
        "products" = @(
            @{ name = "Wide-Leg Jumpsuit"; price = "$129.99"; placeholder = "Jumpsuit 1"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Black", "Navy", "Sage") },
            @{ name = "Fitted Romper"; price = "$89.99"; placeholder = "Jumpsuit 2"; sizes = @("XS", "S", "M", "L"); colors = @("Coral", "Mint", "Lavender") },
            @{ name = "Bohemian Jumpsuit"; price = "$119.99"; placeholder = "Jumpsuit 3"; sizes = @("S", "M", "L", "XL"); colors = @("Terracotta", "Olive", "Cream") },
            @{ name = "Casual Overall Style"; price = "$99.99"; placeholder = "Jumpsuit 4"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Denim", "Black", "Khaki") },
            @{ name = "Evening Jumpsuit"; price = "$149.99"; placeholder = "Jumpsuit 5"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Black", "Midnight", "Deep Purple") },
            @{ name = "Cropped Leg Jumpsuit"; price = "$109.99"; placeholder = "Jumpsuit 6"; sizes = @("S", "M", "L", "XL"); colors = @("White", "Sage", "Blush") }
        )
    }
    "Two-piece" = @{
        "products" = @(
            @{ name = "Crop Top & Skirt Set"; price = "$119.99"; placeholder = "Two-piece 1"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Matching Sage", "Matching Blush", "Matching Cream") },
            @{ name = "Matching Cardigan Set"; price = "$134.99"; placeholder = "Two-piece 2"; sizes = @("S", "M", "L", "XL"); colors = @("Oatmeal Set", "Charcoal Set", "Dusty Rose Set") },
            @{ name = "Shorts & Top Combo"; price = "$99.99"; placeholder = "Two-piece 3"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Coral Set", "Mint Set", "Lavender Set") },
            @{ name = "Blazer & Pants Set"; price = "$159.99"; placeholder = "Two-piece 4"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Black Set", "Navy Set", "Gray Set") },
            @{ name = "Knit Top & Bottom Set"; price = "$109.99"; placeholder = "Two-piece 5"; sizes = @("XS", "S", "M", "L", "XL"); colors = @("Cream Set", "Sage Set", "Terracotta Set") },
            @{ name = "Vintage Inspired Set"; price = "$124.99"; placeholder = "Two-piece 6"; sizes = @("S", "M", "L", "XL"); colors = @("Mustard Set", "Forest Set", "Rust Set") }
        )
    }
    "Men" = @{
        "products" = @(
            @{ name = "Classic Polo Shirt"; price = "$79.99"; placeholder = "Men 1"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Navy", "White", "Gray") },
            @{ name = "Knit Sweater"; price = "$99.99"; placeholder = "Men 2"; sizes = @("M", "L", "XL", "XXL"); colors = @("Charcoal", "Oatmeal", "Navy") },
            @{ name = "Casual Button-Up"; price = "$89.99"; placeholder = "Men 3"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("White", "Light Blue", "Sage") },
            @{ name = "Textured Vest"; price = "$69.99"; placeholder = "Men 4"; sizes = @("M", "L", "XL", "XXL"); colors = @("Brown", "Gray", "Black") },
            @{ name = "Cardigan Jacket"; price = "$119.99"; placeholder = "Men 5"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("Charcoal", "Camel", "Forest") },
            @{ name = "Henley Style Shirt"; price = "$74.99"; placeholder = "Men 6"; sizes = @("S", "M", "L", "XL", "XXL"); colors = @("White", "Gray", "Navy") }
        )
    }
}

# Simple collection template
$template = @'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{COLLECTION_NAME}} Collection - Thread Theory</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="collection-styles.css">
    <style>
        /* Enhanced collection styles */
        .collection-header {
            padding: 120px 0 60px;
            background: linear-gradient(135deg, rgba(251, 207, 232, 0.1) 0%, rgba(255, 255, 255, 1) 50%, rgba(196, 181, 253, 0.1) 100%);
            text-align: center;
        }
        
        .collection-header-content {
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(251, 113, 133, 0.2);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .collection-title {
            font-family: var(--font-serif);
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 300;
            color: var(--primary-black);
            margin-bottom: 20px;
            letter-spacing: 1px;
        }
        
        .breadcrumb {
            font-size: 0.9rem;
            color: var(--charcoal);
            opacity: 0.8;
        }
        
        .breadcrumb a {
            color: #f87171;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .breadcrumb a:hover {
            color: #dc2626;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 25px;
            margin-top: 40px;
        }
        
        .product-item {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            overflow: hidden;
            border: 1px solid rgba(251, 113, 133, 0.1);
            transition: all 0.3s ease;
        }
        
        .product-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            border-color: rgba(251, 113, 133, 0.3);
        }
        
        .product-image {
            position: relative;
            aspect-ratio: 1;
            overflow: hidden;
        }
        
        .image-placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(251, 207, 232, 0.1), rgba(196, 181, 253, 0.1));
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--charcoal);
            font-size: 0.9rem;
            text-align: center;
            padding: 20px;
        }
        
        .image-placeholder p {
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .product-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .product-item:hover .product-overlay {
            opacity: 1;
        }
        
        .quick-view-btn, .add-to-cart-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .quick-view-btn {
            background: rgba(255, 255, 255, 0.9);
            color: var(--primary-black);
        }
        
        .add-to-cart-btn {
            background: linear-gradient(135deg, #f87171, #a855f7);
            color: white;
        }
        
        .quick-view-btn:hover, .add-to-cart-btn:hover {
            transform: translateY(-2px);
        }
        
        .product-info {
            padding: 20px;
        }
        
        .product-name {
            font-size: 1rem;
            font-weight: 600;
            color: var(--primary-black);
            margin-bottom: 8px;
            line-height: 1.3;
        }
        
        .product-price {
            font-size: 1.1rem;
            font-weight: 600;
            color: #f87171;
            margin-bottom: 10px;
        }
        
        .product-options {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .option-group {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
        }
        
        .option-label {
            font-size: 0.8rem;
            color: var(--charcoal);
            font-weight: 500;
            width: 100%;
            margin-bottom: 4px;
        }
        
        .option-item {
            padding: 3px 8px;
            background: rgba(251, 113, 133, 0.1);
            border: 1px solid rgba(251, 113, 133, 0.2);
            border-radius: 8px;
            font-size: 0.75rem;
            color: var(--primary-black);
        }
        
        /* Responsive Design */
        @media (max-width: 1200px) {
            .gallery-grid {
                grid-template-columns: repeat(5, 1fr);
            }
        }
        
        @media (max-width: 1000px) {
            .gallery-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        
        @media (max-width: 800px) {
            .gallery-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }
        }
        
        @media (max-width: 600px) {
            .gallery-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }
            
            .product-info {
                padding: 15px;
            }
            
            .product-name {
                font-size: 0.9rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="index.html" class="logo-text">Thread Theory</a>
            </div>
            <ul class="nav-menu" id="nav-menu">
                <li class="nav-item">
                    <a href="index.html" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="index.html#collections" class="nav-link">Collections</a>
                </li>
                <li class="nav-item">
                    <a href="creators.html" class="nav-link">Creators</a>
                </li>
                <li class="nav-item">
                    <a href="about.html" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                    <a href="vote.html" class="nav-link">Vote</a>
                </li>
                <li class="nav-item">
                    <a href="cart.html" class="nav-link">Cart</a>
                </li>
                <li class="nav-item">
                    <a href="account.html" class="nav-link">Account</a>
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
                <h1 class="collection-title">{{COLLECTION_NAME}} Collection</h1>
                <div class="breadcrumb">
                    <a href="index.html">Home</a> / <a href="index.html#collections">Collections</a> / <span>{{COLLECTION_NAME}}</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Collection Gallery -->
    <section class="collection-gallery">
        <div class="container">
            <div class="gallery-grid">
                {{PRODUCTS}}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Thread Theory. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="collection-script.js"></script>
</body>
</html>
'@

foreach ($collectionName in $collections.Keys) {
    $collectionData = $collections[$collectionName]
    $fileName = $collectionName.ToLower() + ".html"
    
    # Generate products HTML
    $productsHtml = ""
    for ($i = 0; $i -lt $collectionData.products.Count; $i++) {
        $product = $collectionData.products[$i]
        $sizesHtml = ($product.sizes | ForEach-Object { "<span class='option-item'>$_</span>" }) -join ""
        $colorsHtml = ($product.colors | ForEach-Object { "<span class='option-item'>$_</span>" }) -join ""
        
        $productsHtml += @"
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
                        <div class="product-options">
                            <div class="option-group">
                                <div class="option-label">Sizes:</div>
                                $sizesHtml
                            </div>
                            <div class="option-group">
                                <div class="option-label">Colors:</div>
                                $colorsHtml
                            </div>
                        </div>
                    </div>
                </div>

"@
    }
    
    # Replace placeholders in template
    $content = $template -replace "{{COLLECTION_NAME}}", $collectionName
    $content = $content -replace "{{PRODUCTS}}", $productsHtml
    
    # Write file
    Set-Content $fileName $content -NoNewline
    Write-Host "Updated $fileName"
}

Write-Host "All collection pages updated successfully!"