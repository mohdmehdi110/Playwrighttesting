$env:SITE="SirJohnSoanes"
npx playwright test tests/Projectredirection.spec.js

$env:SITE="whitechapel"
npx playwright test tests/Whitechapel.spec.js