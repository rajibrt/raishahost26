#!/usr/bin/env node
// Checks that every plan price in src/data/plans.ts matches the price the WHMCS store
// (hosting.raishahost.com) charges, in both Taka and US dollars.
// Run: npm run check:prices   (exits with code 1 when anything differs)
//
// It reads WHMCS's public price feed (feeds/productsinfo.php), so it needs no login.
// WHMCS currency IDs: 1 = USD, 5 = BDT (Configuration > Payments > Currencies).

import { sharedHostingPlans, vpsPlans } from '../src/data/plans.ts'

const WHMCS = 'https://hosting.raishahost.com'
const CURRENCY = { usd: 1, bdt: 5 }

async function whmcsPrice(pid, cycle, currency) {
  const url = `${WHMCS}/feeds/productsinfo.php?pid=${pid}&get=price&billingcycle=${cycle}&currency=${currency}`
  const text = await (await fetch(url)).text()
  // The feed answers with document.write('3799.00TK') or document.write('$29.99USD').
  const m = text.match(/document\.write\('([^']*)'\)/)
  if (!m) return { raw: text.trim(), value: NaN }
  const value = parseFloat(m[1].replace(/[^0-9.]/g, ''))
  return { raw: m[1], value }
}

const plans = [...sharedHostingPlans, ...vpsPlans]
let bad = 0

for (const plan of plans) {
  const cycle = plan.period === 'yearly' ? 'annually' : 'monthly'
  for (const cur of ['bdt', 'usd']) {
    const want = plan.price[cur]
    if (want === undefined) continue
    const got = await whmcsPrice(plan.whmcsPid, cycle, CURRENCY[cur])
    const ok = Math.abs(got.value - want) < 0.005
    if (!ok) bad++
    console.log(`${ok ? 'ok  ' : 'DIFF'}  ${plan.name.padEnd(14)} ${cur.toUpperCase()}  plans.ts ${String(want).padEnd(8)} WHMCS ${got.raw}`)
  }
}

if (bad) {
  console.error(`\n${bad} price(s) differ. Change WHMCS (Products/Services > product > Pricing) or plans.ts so both match.`)
  process.exit(1)
}
console.log('\nAll prices match.')
