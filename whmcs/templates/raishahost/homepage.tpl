{* RaishaHost homepage. Plan words come from includes/rh-plans.tpl (built from src/data/plans.ts);
   prices are read live from WHMCS in the visitor's currency. *}
{include file="$template/includes/rh-plans.tpl"}
{assign var=rhSite value="https://raishahost.com"}
{assign var=rhBdt value=($activeCurrency.code == 'BDT')}

{capture name=rhCurrency}
    {if !$loggedin && $currencies && count($currencies) > 1}
        <div class="rh-cur" role="group" aria-label="Currency">
            {foreach $currencies as $c}
                <a href="{$WEB_ROOT}/index.php?currency={$c.id}#plans" class="{if $activeCurrency.id == $c.id}on{/if}" {if $activeCurrency.id == $c.id}aria-current="true"{/if}>{if $c.code == 'BDT'}৳ BDT{else}{$c.prefix} {$c.code}{/if}</a>
            {/foreach}
        </div>
    {/if}
{/capture}


<div class="rh-sections">

    <section class="rh-sec" id="plans">
        <div class="container">
            <div class="rh-sec-head">
                <div>
                    <p class="rh-k">cPanel hosting &middot; billed yearly</p>
                    <h2>Hosting for websites, shops and email.</h2>
                    <p>Every plan uses cPanel, the control panel most hosts use, so moving in is easy. Pay once a year.</p>
                </div>
                {$smarty.capture.rhCurrency}
            </div>
            <div class="rh-plans" data-stagger>
                {foreach $rhSharedOrder as $pid}
                    {include file="$template/includes/rh-plan-card.tpl" plan=$rhShared[$pid] per='year'}
                {/foreach}
            </div>
            <ul class="rh-common">
                {foreach $rhSharedCommon as $f}<li><i class="fas fa-check"></i> {$f}</li>{/foreach}
            </ul>
        </div>
    </section>

    <section class="rh-sec rh-sec-alt" id="vps">
        <div class="container">
            <div class="rh-sec-head">
                <div>
                    <p class="rh-k">VPS servers &middot; billed monthly</p>
                    <h2>Your own server, with full root access.</h2>
                    <p>A VPS (virtual private server) gives you dedicated CPU, memory and NVMe storage for apps, stores and busy websites.</p>
                </div>
                {$smarty.capture.rhCurrency}
            </div>
            <div class="rh-plans" data-stagger>
                {foreach $rhVpsOrder as $pid}
                    {include file="$template/includes/rh-plan-card.tpl" plan=$rhVps[$pid] per='month'}
                {/foreach}
            </div>
            <ul class="rh-common">
                {foreach $rhVpsCommon as $f}<li><i class="fas fa-check"></i> {$f}</li>{/foreach}
            </ul>
        </div>
    </section>

    <section class="rh-sec" id="domains">
        <div class="container">
            <div class="rh-sec-head">
                <div>
                    <p class="rh-k">Domains</p>
                    <h2>Get the name. Keep it safe.</h2>
                    <p>Register a new domain or move one you already own. You manage DNS, renewals and contacts from your client area.</p>
                </div>
            </div>
            <div class="rh-cards rh-cards-3" data-stagger>
                <a class="rh-card" href="{$WEB_ROOT}/cart.php?a=add&domain=register">
                    <i class="far fa-search"></i>
                    <h3>Register a domain</h3>
                    <p>Search .com, .net, .org, .com.bd and many more.</p>
                    <span class="rh-go">Search domains &rarr;</span>
                </a>
                <a class="rh-card" href="{$WEB_ROOT}/cart.php?a=add&domain=transfer">
                    <i class="far fa-exchange"></i>
                    <h3>Transfer a domain</h3>
                    <p>Move your domain to RaishaHost. Most transfers add a year to your registration.</p>
                    <span class="rh-go">Start a transfer &rarr;</span>
                </a>
                <a class="rh-card" href="{routePath('domain-pricing')}">
                    <i class="far fa-tags"></i>
                    <h3>Domain prices</h3>
                    <p>Register, renew and transfer prices for every extension, in your currency.</p>
                    <span class="rh-go">See all prices &rarr;</span>
                </a>
            </div>
        </div>
    </section>

    <section class="rh-sec rh-sec-alt" id="included">
        <div class="container">
            <div class="rh-sec-head">
                <div>
                    <p class="rh-k">Included</p>
                    <h2>What you get with every plan.</h2>
                </div>
            </div>
            <div class="rh-cards rh-cards-4" data-stagger>
                <div class="rh-card">
                    <i class="far fa-lock"></i>
                    <h3>Free SSL</h3>
                    <p>The padlock in the browser bar, on every hosting plan, renewed for you.</p>
                </div>
                <div class="rh-card">
                    <i class="far fa-undo"></i>
                    <h3>30-day money-back</h3>
                    <p>Not happy? Ask within 30 days for a refund of the hosting fee. <a href="{$rhSite}/money-back">Read the terms</a>.</p>
                </div>
                <div class="rh-card">
                    <i class="far fa-life-ring"></i>
                    <h3>24/7 support</h3>
                    <p>Open a ticket any time, day or night. Our team in Bangladesh answers it.</p>
                </div>
                <div class="rh-card">
                    <i class="far fa-signal"></i>
                    <h3>99.9% uptime target</h3>
                    <p>We watch our servers around the clock so your site stays online.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="rh-sec" id="services">
        <div class="container">
            <div class="rh-band">
                <div>
                    <p class="rh-k">Need a website too?</p>
                    <h2>We design and build it for you.</h2>
                    <p>WordPress sites, online shops and custom-coded websites, plus logos and graphic design.</p>
                </div>
                <div class="rh-band-cta">
                    <a class="rh-btn rh-btn-pri" href="{$rhSite}/services">See website prices</a>
                    <a class="rh-btn rh-btn-ghost" href="{$rhSite}/work">See our work</a>
                </div>
            </div>
        </div>
    </section>

    <section class="rh-sec rh-sec-alt" id="help">
        <div class="container">
            <div class="rh-sec-head">
                <div>
                    <p class="rh-k">{if $loggedin}Your account{else}Help &amp; account{/if}</p>
                    <h2>{if $loggedin}Welcome back.{else}How can we help?{/if}</h2>
                </div>
            </div>
            <div class="rh-quick" data-stagger>
                {if $loggedin}
                    <a href="{$WEB_ROOT}/clientarea.php"><i class="far fa-home"></i>Dashboard</a>
                    <a href="{$WEB_ROOT}/clientarea.php?action=services"><i class="far fa-cubes"></i>My services</a>
                    <a href="{$WEB_ROOT}/clientarea.php?action=domains"><i class="far fa-globe"></i>My domains</a>
                    <a href="{$WEB_ROOT}/clientarea.php?action=masspay&all=true"><i class="far fa-credit-card"></i>Pay invoices</a>
                    <a href="{$WEB_ROOT}/supporttickets.php"><i class="far fa-comments"></i>My tickets</a>
                {else}
                    <a href="{$WEB_ROOT}/login.php"><i class="far fa-sign-in"></i>Log in</a>
                    <a href="{$WEB_ROOT}/register.php"><i class="far fa-user-plus"></i>Create account</a>
                    <a href="{$WEB_ROOT}/submitticket.php"><i class="far fa-life-ring"></i>Open a ticket</a>
                    <a href="{routePath('knowledgebase-index')}"><i class="far fa-book"></i>Knowledge base</a>
                    <a href="{$WEB_ROOT}/serverstatus.php"><i class="far fa-server"></i>Network status</a>
                {/if}
            </div>
            <p class="rh-call">Prefer to talk? Call <a href="tel:+8801711380679">+880 1711-380679</a>.</p>
        </div>
    </section>

</div>
