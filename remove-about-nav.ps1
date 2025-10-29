# PowerShell script to remove "About" navigation item from collection HTML files

$files = @(
    "accessories.html",
    "bags.html",
    "bottoms.html",
    "dresses.html",
    "hair.html",
    "hats.html",
    "home.html",
    "jewellery.html",
    "jerseys.html",
    "jumpsuits.html",
    "men.html",
    "shoes.html",
    "shorts.html",
    "shrugs.html",
    "skirts.html",
    "tops.html",
    "two-piece.html"
)

$aboutLine = '                <li class="nav-item">'
$aboutLine2 = '                    <a href="about.html" class="nav-link">About</a>'
$aboutLine3 = '                </li>'

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        # Remove the About navigation item (3 lines)
        $content = $content -replace "(?s)$aboutLine\s*$aboutLine2\s*$aboutLine3\s*", ""
        Set-Content $file $content
        Write-Host "Removed About nav from $file"
    } else {
        Write-Host "File $file not found"
    }
}
