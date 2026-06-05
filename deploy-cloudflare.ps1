param(
  [string]$ProjectName = "little-depths"
)

$ErrorActionPreference = "Stop"

$wrangler = Get-Command wrangler -ErrorAction SilentlyContinue
if (-not $wrangler) {
  throw "Wrangler CLI was not found. Install it or use Cloudflare Pages Direct Upload with cloudflare-pages-upload.zip."
}

wrangler pages deploy dist --project-name $ProjectName
