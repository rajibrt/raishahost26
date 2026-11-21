{* Homepage hero: domain search on the left, a "three steps to go online" panel on the right.
   The panel's plan and price are the most popular cPanel plan, read live from WHMCS. *}
{include file="$template/includes/rh-plans.tpl"}
{assign var=rhHeroPid value=$rhSharedOrder[0]}
{foreach $rhSharedOrder as $pid}{if $rhShared[$pid].pop}{assign var=rhHeroPid value=$pid}{/if}{/foreach}
{assign var=rhHeroProd value=\WHMCS\Product\Product::find($rhHeroPid)}
<section class="rh-hero">
    <div class="rh-hero-glow" aria-hidden="true"></div>
    <div class="container">
        <div class="rh-hero-grid">
            <div class="rh-hero-in">
                <p class="rh-k">Hosting since 2008 &middot; Clients around the world</p>
                <h1>Everything your website needs, <em>in one place.</em></h1>
                <p class="rh-lead">Find a domain, pick a hosting plan or a VPS server, and pay in Taka or US dollars. Free SSL on every plan and a 30-day money-back guarantee.</p>

                <form class="rh-search" method="get" action="{$WEB_ROOT}/cart.php" role="search">
                    <input type="hidden" name="a" value="add">
                    <input type="hidden" name="domain" value="register" data-rh-mode>
                    <label class="sr-only" for="rhDomain">Domain name</label>
                    <span class="rh-search-www" aria-hidden="true">www.</span>
                    <input id="rhDomain" type="text" name="query" placeholder="yourbusiness.com" autocapitalize="none" autocomplete="off" spellcheck="false" required>
                    <button type="submit" class="rh-btn rh-btn-pri">Search</button>
                    <button type="submit" class="rh-btn rh-btn-ghost rh-transfer" data-rh-transfer>Transfer</button>
                </form>

                {if $featuredTlds}
                    <ul class="rh-tlds" aria-label="Domain prices">
                        {foreach $featuredTlds as $num => $tldinfo}
                            {if $num < 6 && is_object($tldinfo.register)}
                                <li><b>{$tldinfo.tld}</b> {$tldinfo.register->toPrefixed()|replace:'.00':''}<small>/yr</small></li>
                            {/if}
                        {/foreach}
                        <li><a href="{routePath('domain-pricing')}">All prices &rarr;</a></li>
                    </ul>
                {else}
                    <p class="rh-tlds-link"><a href="{routePath('domain-pricing')}">See every domain price &rarr;</a></p>
                {/if}

                <ul class="rh-trust">
                    <li><i class="far fa-lock"></i> Free SSL</li>
                    <li><i class="far fa-undo"></i> 30-day money-back</li>
                    <li><i class="far fa-life-ring"></i> 24/7 support tickets</li>
                    <li><i class="far fa-signal"></i> 99.9% uptime target</li>
                </ul>
            </div>

            <figure class="rh-setup" aria-label="Getting online takes three steps">
                <div class="rh-setup-bar" aria-hidden="true">
                    <span class="dots"><i></i><i></i><i></i></span>
                    <span class="url"><i class="fas fa-lock"></i> https://yourbusiness.com</span>
                </div>
                <div class="rh-setup-body">
                    <p class="rh-k">Online in three steps</p>
                    <ol class="rh-steps">
                        <li>
                            <span class="n">1</span>
                            <div><small>Domain name</small><b>yourbusiness.com</b></div>
                            <em class="ok"><i class="fas fa-check"></i> Search</em>
                        </li>
                        <li>
                            <span class="n">2</span>
                            <div><small>cPanel hosting</small><b>{$rhShared[$rhHeroPid].name} plan</b></div>
                            {if $rhHeroProd && $rhHeroProd->pricing()->first()}
                                <em class="price">{$rhHeroProd->pricing()->first()->price()->toPrefixed()|replace:'.00':''}<i>/year</i></em>
                            {/if}
                        </li>
                        <li>
                            <span class="n">3</span>
                            <div><small>Security</small><b>Free SSL certificate</b></div>
                            <em class="ok"><i class="fas fa-check"></i> Included</em>
                        </li>
                    </ol>
                    <a class="rh-setup-cta" href="{$WEB_ROOT}/cart.php?a=add&pid={$rhHeroPid}">Order the {$rhShared[$rhHeroPid].name} plan <i class="far fa-arrow-right"></i></a>
                </div>
                <figcaption class="rh-chip rh-chip-a"><i class="far fa-undo"></i> 30-day money-back</figcaption>
                <span class="rh-chip rh-chip-b" aria-hidden="true">৳ / $ &middot; pay your way</span>
            </figure>
        </div>
    </div>
</section>
