@echo off
echo [1/4] Configuring remote URL to: https://github.com/khuntiankita/enforcer.git
:: Add safe directory exception to fix the dubious ownership warning
git config --global --add safe.directory D:/Enforcer
git remote set-url origin https://github.com/khuntiankita/enforcer.git 2>nul
if %errorlevel% neq 0 (
    git remote add origin https://github.com/khuntiankita/enforcer.git
)

echo.
echo [2/4] Staging changes...
git add -A

echo.
echo [3/4] Committing changes...
git commit -m "Push current folder state to enforcer repo"

echo.
echo [4/4] Pushing changes to remote...
:: Get current branch name
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if "%CURRENT_BRANCH%"=="" (
    set CURRENT_BRANCH=main
)
echo Current branch is: %CURRENT_BRANCH%
git push -u origin %CURRENT_BRANCH%

echo.
echo Push attempt completed!
pause
