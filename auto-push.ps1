# =============================================
# MAISON - Auto Push to GitHub Script
# =============================================
# วิธีใช้: เปิด PowerShell แล้วรัน .\auto-push.ps1
# กด Ctrl+C เพื่อหยุด

Write-Host "🚀 MAISON Auto-Push Script Started!" -ForegroundColor Cyan
Write-Host "📁 Watching: $(Get-Location)" -ForegroundColor Yellow
Write-Host "⏰ Checking for changes every 30 seconds..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host ""

while ($true) {
    # Check for changes
    $status = git status --porcelain
    
    if ($status) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Write-Host "📝 Changes detected at $timestamp" -ForegroundColor Green
        
        # Stage all changes
        git add -A
        
        # Create commit message with timestamp
        $commitMsg = "Auto-update: $timestamp"
        git commit -m $commitMsg
        
        # Push to GitHub
        Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Cyan
        git push origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        } else {
            Write-Host "❌ Push failed. Please check your connection." -ForegroundColor Red
        }
        
        Write-Host ""
    } else {
        $time = Get-Date -Format "HH:mm:ss"
        Write-Host "⏳ [$time] No changes detected. Waiting..." -ForegroundColor DarkGray
    }
    
    # Wait 30 seconds before next check
    Start-Sleep -Seconds 30
}
